/**
 * @file Aggregator by first letter of file
 */

const Aggregator = require('./aggregator');
const _ = require('underscore');

class Alphabetical extends Aggregator {
	filter() {
		return this.name.length > 0;
	}

	grouper() {
		const letter = this.name[0];

		if (!Object.is(Number.parseInt(letter), NaN)) {
			return '#';
		} else if (/^[a-zA-Z]$/.exec(letter)) {
			return letter.toUpperCase();
		} else {
			return 'especial';
		}
	}
}

module.exports = Alphabetical;