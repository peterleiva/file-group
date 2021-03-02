/**
 * @file Aggregator by first letter of file
 */

import Aggregator from './aggregator.js';

export default class Alphabetical extends Aggregator {
  filter() {
    return this.name.length > 0;
  }

  naming() {
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
