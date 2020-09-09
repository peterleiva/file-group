/**
 * @file Stats from script operation
 */

import bytes from 'bytes';
import pluralize from 'pluralize';
import { stat } from 'fs/promises';
import path from 'path';

/**
 * Print stats information about the folder groups created. Two level of info
 * is printed, one is related to files and the other to the groups itself
 *
 * @param {Map<string, fs.Dirent[]>} direntGroups
 * @param {string} base base directory
 */
export default function(direntGroups, base) {
	const byteOpts = { thousandsSeparator: '.' }
	const fStats = [...direntGroups.values()]
									.reduce((dirents, group) => dirents.concat(group), [])
									.map(d => stat(path.resolve(base, d.name)));

	/**
	 * Count the number of bytes inside the group
	 */
	async function totalBytes() {
		try {
			const size = (await Promise.all(fStats))
											.reduce((sum, file) => sum + file.size, 0);

			return bytes(size, byteOpts);

		} catch (error) {
			console.error('Error trying to load files stats');
			throw error;
		}
	}

	return {
		/**
		 * Print file related stats
		 */
		async files() {
			// print files found
			console.info(`${pluralize('file', fStats.length, true)} found ` +
			`with ${await totalBytes()}`);
		},

		/**
		 * Print group related stats
		 */
		groups() {
			// print groups found
			console.info(`${pluralize('group', direntGroups.size, true)} found`);

			// print all groups found
			if (direntGroups.size > 0) {
				console.info('Grouping by: ');

				for (const group of direntGroups.keys()) {
					console.info('\t- ' + group);
				}
			}
		}
	}
}

