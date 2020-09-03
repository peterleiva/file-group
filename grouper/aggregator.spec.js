const Aggregator = require('./name-date');

describe('NameDateAggregator', () => {
	let strategy;

	afterEach(() => strategy = null)

	describe('No name giving', () => {
		it('Throws no given name error', () => {
			expect(new Aggregator()).toThrowError('Name must be a string');
		});
	});

	describe('With given name', () => {
		describe('.test', () => {
			describe('Returns false when', () => {
				it('Has only numbers', () => {
					strategy = new Aggregator('123482');
					expect(strategy.filter()).toBe(false);
				});

				it('Has only non-space caracteres', () => {
					strategy = new Aggregator('abc');
					expect(strategy.filter()).toBe(false);
				});

				it('Miss last 2 char number', () => {
					strategy = new Aggregator('name - 2020-02-01-23-20')
					expect(strategy.filter()).toBe(false);
				});

				it('Has only the date part', () => {
					strategy = new Aggregator('2020-02-01-23-20-50')
					expect(strategy.filter()).toBe(false);
				});

				it('Has only the name part', () => {
					strategy = new Aggregator('name - ')
					expect(strategy.filter()).toBe(false);
				});

				it('No space between name and date', () => {
					strategy = new Aggregator('name-2020-02-01 23-20-50');
					expect(strategy.filter()).toBe(false);
				});

				it('Date is all separated by dash', () => {
					strategy = new Aggregator('name - 2020-02-01-23-20-50');
					expect(strategy.filter()).toBe(false);
				});
			});

			describe('Returns true when', () => {
				const name = 'name - 2020-02-01 23-20-50'

				it('Have exact format <name> - <date>', () => {
					strategy = new Aggregator(name);
					expect(strategy.filter()).toBe(true);
				});

				it('Has a extension', () => {
					strategy = new Aggregator(name + '.txt');
					expect(strategy.filter()).toBe(true);
				});

				it('Name all in caps', () => {
					strategy = new Aggregator(name.toUpperCase());
					expect(strategy.filter()).toBe(true);
				});

				it('Has special caracteres in name', () => {
					strategy = new Aggregator('é' + name);
					expect(strategy.filter()).toBe(true);
				});
			})
		});

		describe('.grouper', () => {
			it('Get null when no match', () => {
				const strategy = new Aggregator('name - ');
				expect(strategy.grouper()).toBeNull();
			});

			it('Get group as <name> from <name> - <date>', () => {
				const strategy = new Aggregator('filename - 2020-02-01 23-20-50')
				expect(strategy.grouper()).toBe('filename');
			});
		})
	});
});