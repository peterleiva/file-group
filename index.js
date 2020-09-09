/**
 * @file Group files, other than directories, using certain criteras. Those
 * criateras defines two algorythm, one checking if a file is ok to be grouped
 * and the second to determine the group name according to file name
 */
// TODO: passar dirent para algoritmo de agregação para possa filtrar por tipo
// TODO: Agrupar alfabeticamente usando subpastas ou arquivos

const fs = require('fs/promises');
const path = require('path');
const bytes = require('bytes');
const readline = require('readline');
const grouper = require('./grouper');
const organizer = require('./lib/organizer');

const ACCEPTANCE_PATTERN = /^(y|yes)$/i;
/**
 * Main point from the application
 *
 * @param {string} base
 */
async function main(base = __dirname, aggregator = 'alphabetical') {
	const byteOpts = { thousandsSeparator: '.' }

	const Aggregator = grouper[aggregator];

	if (!Aggregator) {
		console.error('Failed to load aggregator algorythm');
		return;
	}

	const dir = await fs.opendir(base);
	const dirStat = await fs.stat(base);
	const dirSize = bytes(dirStat.size, byteOpts);

	// print total bytes from base folder
	console.log(`${dirSize} Read`);

	const direntGroups = new Map();
	const fStats = [];
	
	for await (const dirent of dir) {
		const strategy = new Aggregator(dirent.name);

		if (dirent.isFile() && strategy.filter()) {
			const group = strategy.naming();

			// set empty vector if group do not already exists
			if (!direntGroups.has(group))
				direntGroups.set(group, []);

			direntGroups
				.get(group)
				.push(dirent);

			// vector of file stats
			const file = path.join(base, dirent.name)
			fStats.push(fs.stat(file));
		}
	}

	// print files length to be moved
	console.log(`${fStats.length} files found`);
	// print groups to be created
	console.log(`${direntGroups.size} group(s) found`);
	// bytes to be moved
	let totalBytes;

	try {
		const size = (await Promise.all(fStats))
			.reduce((sum, file) => sum + file.size, 0);
		totalBytes = bytes(size, byteOpts);

	} catch(error) {
		console.log('Error trying to load files stats');
		await dir.close();
		throw error;
	}

	// show groups
	if (direntGroups.size > 0) {
		console.log('Grouping by: ');
		for (const group of direntGroups.keys()) {
			console.log('\t- ' + group);
		}
	} else {
		await dir.close;
		return;
	}

	// asking if they're sure of the operation
	console.log(`You're moving ${totalBytes} from ${path.resolve(base)}`);
	
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('Are you sure (y/N)?: ', async answer => {
		if (!ACCEPTANCE_PATTERN.exec(answer)) {
			console.info('You answer is NO');
			await dir.close;
			rl.close();
			return;
		}
		
		await organizer(base, direntGroups);
	
		// print bytes found moved
		console.log(`${totalBytes} moved`);
	
		try { await dir.close }
		catch(error) {
			console.error('Failed to close directory');
			throw error;
		} finally {
			rl.close();
		}
	});
}

const base = process.argv[2];

if (!base) { 
	console.error('Usage: file-group <directory>');
	return;
}

main(base, process.argv[3])
	.catch(console.error);
