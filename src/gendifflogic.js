import _ from 'lodash';
import parseFile from './parse.js';

const genDiff = (file1, file2) => {
  const parsedFile1 = parseFile(file1);
  const parsedFile2 = parseFile(file2);
  const file1Keys = _.keys(parsedFile1);
  const file2Keys = _.keys(parsedFile2);
  const allKeysUnited = _.union(file1Keys, file2Keys);

  const result = allKeysUnited.reduce((acc, key) => {
    if (_.has(parsedFile1, key) && _.has(parsedFile2, key)) {
      if (parsedFile1[key] === parsedFile2[key]) {
        acc.push(`  ${key}: ${parsedFile1[key]}`);
      } else {
        acc.push(`- ${key}: ${parsedFile1[key]}`);
        acc.push(`+ ${key}: ${parsedFile2[key]}`);
      }
    } else if (_.has(parsedFile1, key)) {
      acc.push(`- ${key}: ${parsedFile1[key]}`);
    } else if (_.has(parsedFile2, key)) {
      acc.push(`+ ${key}: ${parsedFile2[key]}`);
    }
    return acc;
  }, []);

  const sortedResult = _.sortBy(result, (item) => {
    const key = item.replace(/[-+ ]/g, '').split(':')[0];
    const file = item.startsWith('-') ? 'file1' : 'file2';
    return `${key}_${file}`;
  });
  return sortedResult.join('\n');
};

export default genDiff;
