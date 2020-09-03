const Aggregator = require('./alphabetical');

describe('Alphabetical', () => {
	describe('.grouper', () => {
		it('Returns # when begins with number', () => {
			const strategy = new Aggregator('10 arquivo');
			expect(strategy.grouper()).toBe('#');
		});

		it('Get the first letter of file', () => {
			const strategy = new Aggregator('arquivo');
			expect(strategy.grouper()).toBe('A');
		});

		describe('Special caracteres', () => {
			it('especial when begin with space', () => {
				const strategy = new Aggregator(' arquivo');
				expect(strategy.grouper()).toBe('especial');
			});

			it('especial when begin with underscore', () => {
				const strategy = new Aggregator('_arquivo');
				expect(strategy.grouper()).toBe('especial');
			})
		})
	});

	describe('.filter', () => {
		it('Always returns true', () => {
			expect(new Aggregator('whaetever').filter()).toBe(true);
		})
	})
});
