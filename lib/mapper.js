/**
 * @file Group a directory into a dictionary grouped by aggregator algorithm
 */

/**
 * Take a directory and group its files by name using aggregator to filter files
 * to corresponding fs.dirent groups
 *
 * @param {Aggregator} Aggregator aggreator to filter and naming groups
 * @param {fs.Dir} directory Directory stream
 * @return {Map<string, fs.Dirent>} dictionary with group name and its files
 */
export default async function mapper(Aggregator, directory) {
	const direntGroups = new Map();

	for await (const dirent of directory) {
		const strategy = new Aggregator(dirent.name);

		if (dirent.isFile() && strategy.filter()) {
			const group = strategy.naming();

			// set empty vector if group do not already exists
			if (!direntGroups.has(group))
				direntGroups.set(group, []);

			direntGroups
				.get(group)
				.push(dirent);
		}
	}

	return direntGroups
};
