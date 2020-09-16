/**
 * @file Strategy use to group test and group files
 */

import Aggregator from './aggregator.js';

/**
 *
 */
export default class NameDateAggregator extends Aggregator {
	static get pattern() {
		return /^(.+) - (\d{4})(-(\d{2})){2} (-?(\d{2})){3}$/;
	}

	constructor(name) {
		super(name);
	}

	/**
	 * Checks if the given name pass the strategy test
	 */
	filter() {
		return NameDateAggregator.pattern.test(this._extractName());
	}

	/**
	 * Groups the name following a algorithm
	 */
	naming() {
		return (
			NameDateAggregator.pattern
				.exec(this._extractName())?.[1]
				?.toLocaleLowerCase() || null
		);
	}
}
