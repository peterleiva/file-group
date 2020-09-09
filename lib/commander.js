/**
 * @file Parse arguments using commander module
 */

import program from 'commander';

program
	.version('0.3.0')
	.name('file-group')
	.description('File aggregator group files into folders, using a existing ' +
		'algorythm or used a combination of filter and naming options');

program
	.requiredOption('-d | --directory <dir>', 'directory path to be aggregated')
	.option('-a | --aggregator <algorithm>', 'aggregator algorithm', 'alphabetical')
	.option('-f | --filter <pattern>', 'filter pattern as regex')
	.option('-n | --naming <pattern>', 'naming pattern as regex??')
	.option('--debug', 'output extra debugging');

program.on('--help', () => {
	console.log();
	console.log('Example call');
	console.log('  $ file-group --directory ./dir');
});

program.parse(process.argv);

if (program.debug) console.log(program.opts());

export default program;
