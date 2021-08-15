/**
 * @file Group files, other than directories, using certain criteras. Those
 * criateras defines two algorythm, one checking if a file is ok to be grouped
 * and the second to determine the group name according to file name
 */
// TODO: passar dirent para algoritmo de agregação para possa filtrar por tipo
// TODO: Agrupar alfabeticamente usando subpastas ou arquivos
import fs from "fs/promises";
import path from "path";
import readline from "readline";
import { stats, mapper, organizer, commander as program } from "lib";

const ACCEPTANCE_PATTERN = /^(y|yes)$/i;
/**
 * Main point from the application
 * //TODO: melhor errors ao abrir diretório
 *
 * @param {string} base directory to be aggrated
 * @param {Object} options - cli options
 * @param {string} options.aggregator - name of aggregator algorithm
 * @param {boolean} [options.yes = false] - proceed anyway info
 * @param {boolean} [options.info = true] - proceed anyway info
 * @return {Promise<void>}
 */
async function main(base, { aggregator, yes, info }) {
  let Aggregator;

  try {
    ({ default: Aggregator } = await import(
      /* webpackMode: "lazy" */
      /* webpackChunkName: "grouper" */
      /* webpackExclude: /(__tests__|index.js)/ */
      "./lib/grouper/" + aggregator
    ));
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("Failed to load aggregator algorithm: " + aggregator);
    }

    throw error;
  }

  let directory;

  try {
    directory = await fs.opendir(base);
  } catch (error) {
    console.error("Failed to open directory: ", path.resolve(base));
    throw error;
  }

  const groups = await mapper(Aggregator, directory);
  const statsPrinter = stats(groups, base);

  if (info) {
    await statsPrinter.files();
    statsPrinter.groups();
  }

  if (yes) {
    return organizer(base, groups);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nAre you sure ? ([y]es/[N]O) ", async (answer) => {
    if (!ACCEPTANCE_PATTERN.exec(answer)) {
      console.warn("You answer is NO");
    } else {
      await organizer(base, groups);
    }

    rl.close();
  });
}

program(main);
