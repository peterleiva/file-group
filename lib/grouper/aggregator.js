/**
 * @file Strategy use to group test and group files
 */

import path from 'path';

/**
 *
 */
export default class Aggregator {
	constructor(name) {
		this.name = name;
	}

	set name(value) {
		if (typeof value !== 'string')
			throw new Error('Name must be a string');

		this._name = value;
	}

	get name() {
		return this._name;
	}

	_extractName() {
		return path.basename(this.name, path.extname(this.name));
	}

	/**
	 * Checks if the given name pass the strategy test
	 */
	filter() {
		throw new Error('Must be implemented');
	}

	/**
	 * Groups the name following a algorithm
	 */
	naming() {
		throw new Error('Must be implemented');
	}
}
