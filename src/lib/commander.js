/**
 * @file Parse arguments using commander module
 */

import program from "commander";
import pkg from "../../package.json";

// metadata
program
  .version(pkg.version)
  .name("file-group")
  .description(
    "File aggregator: Group files into folders, using a existing algorithms " +
      "or uses a combination of filter and naming convention options",
    {
      directory: "directory path to be aggregated",
    }
  );

// options
program
  .requiredOption("-a, --aggregator <algorithm>", "aggregator")
  .option("-f, --filter <pattern>", "filter pattern as regex")
  .option("-n, --naming <pattern>", "naming pattern as regex??")
  .option("-y, --yes", "proceed witouth ask permission")
  .option("-ni, --no-info", "do not print stats")
  .option("--debug", "output extra debugging");

program.on("--help", () => {
  console.log(`\nExample
  $ file-group -a name-date ./dir`);
});

if (program.debug) console.log(program.opts());
program.parse(process.argv);

/**
 * Run a action at a program top-level command in this case directory
 * @param {Promise<void>} action action be executed by top-level argument
 */
export default async function (action) {
  program
    .arguments("<directory>")
    .action((directory, options) =>
      action(directory, options).catch(console.error)
    );
  await program.parseAsync(process.argv);
}
