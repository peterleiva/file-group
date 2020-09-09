#!/usr/bin/env node

/**
 * @file Group files, other than directories, using certain criteras. Those
 * criateras defines two algorythm, one checking if a file is ok to be grouped
 * and the second to determine the group name according to file name
 */
// TODO: passar dirent para algoritmo de agregação para possa filtrar por tipo
// TODO: Agrupar alfabeticamente usando subpastas ou arquivos

import program from './lib/commander.js';
import fs from 'fs/promises';
import path from 'path';
import bytes from 'bytes';
import readline from 'readline';
import organizer from './lib/organizer.js';
import mapper from './lib/mapper.js';
import stats from './lib/stats.js';

const ACCEPTANCE_PATTERN = /^(y|yes)$/i;
/**
 * Main point from the application
 * TODO: melhorra errors ao abrir diretório
 * @param {string} base
 */
async function main(base, aggregator) {
	let Aggregator;
	try {
		const module = await import(path.resolve('grouper', aggregator + '.js'));
		Aggregator = module.default
	} catch (error) {
		console.error('Failed to load aggregator algorithm');
		process.exit(1);
	}

	let directory;

	try {
		directory = await fs.opendir(base);
	} catch (error) {
		console.error('Failed to open directory: ', path.resolve(base));
		console.error(error.message);
		process.exit(1);
	}

	const direntGroups = await mapper(Aggregator, directory);
	const directoryStats = stats(direntGroups, base);

	directoryStats.groups();

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('Are you sure (y/N)?: ', async answer => {
		if (!ACCEPTANCE_PATTERN.exec(answer)) {
			console.info('You answer is NO');
			return rl.close();
		}

		directoryStats.files();
		await organizer(base, direntGroups);

		rl.close();
	});
}

main(program.directory, program.aggregator)
	.catch(console.error);
