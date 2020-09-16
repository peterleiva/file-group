import Aggregator from '../lib/grouper/alphabetical';

describe('Alphabetical', () => {
	describe('.naming', () => {
		it('Returns # when begins with number', () => {
			const strategy = new Aggregator('10 arquivo');
			expect(strategy.naming()).toBe('#');
		});

		it('Get the first letter of file', () => {
			const strategy = new Aggregator('arquivo');
			expect(strategy.naming()).toBe('A');
		});

		describe('Special caracteres', () => {
			it('especial when begin with space', () => {
				const strategy = new Aggregator(' arquivo');
				expect(strategy.naming()).toBe('especial');
			});

			it('especial when begin with underscore', () => {
				const strategy = new Aggregator('_arquivo');
				expect(strategy.naming()).toBe('especial');
			});
		});
	});

	describe('.filter', () => {
		it('Always returns true', () => {
			expect(new Aggregator('whaetever').filter()).toBe(true);
		});
	});
});
