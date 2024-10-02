import { Command } from 'commander';
import genDiff from '../src/gendifflogic.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.1.8', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const format = options.format || 'stylish';
    console.log(genDiff(filepath1, filepath2, format));
    return genDiff(filepath1, filepath2, format);
  });

export default program;
