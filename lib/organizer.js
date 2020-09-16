/**
 * @file Move groups of dirent files to folders
 * FIXME: Join the folders content in fs.rename if there's two folder with same
 * name
 */

import path from 'path';
import fs from 'fs/promises';

/**
 * Organize dirent groups into folders
 *
 * From each key from direntGroups create a directory which is organize all
 * values. So, a directory will be created to aggregate all the files
 *
 * @param {string} base - Base directory url to move the files
 * @param {Map<string, fs.Dirent[]>} direntGroups - Map between dir name and
 * 	its dirent structure
 */
export default async (base, direntGroups) => {
	// create directory and move the found files
	for (const [group, dirents] of direntGroups) {
		const directory = path.join(base, group);
		await fs.mkdir(directory, { recursive: true });

		// move files to groups
		for (const dir of dirents) {
			const oldPath = path.join(base, dir.name);
			const newPath = path.join(base, group, dir.name);
			await fs.rename(oldPath, newPath);
		}
	}
};
