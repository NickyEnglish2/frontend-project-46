import _ from 'lodash';
import parseFile from './parse.js';

const compareValues = (unitedKeys, obj1, obj2) => {
  const result = unitedKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        const nestedResult = compareValues(_.keys(obj1[key]), obj1[key], obj2[key]);
        acc.push(...nestedResult);
      } else if (obj1[key] === obj2[key]) {
        acc.push(`  ${key}: ${obj1[key]}`);
      } else {
        acc.push(`- ${key}: ${obj1[key]}`);
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
    } else if (_.has(obj1, key)) {
      acc.push(`- ${key}: ${obj1[key]}`);
    } else if (_.has(obj2, key)) {
      acc.push(`+ ${key}: ${obj2[key]}`);
    }
    return acc;
  }, []);

  return result;
};

const genDiff = (file1, file2) => {
  const parsedFile1 = parseFile(file1);
  const parsedFile2 = parseFile(file2);
  const allKeysUnited = _.union(_.keys(parsedFile1), _.keys(parsedFile2));

  const result = compareValues(allKeysUnited, parsedFile1, parsedFile2);

  const sortedResult = _.sortBy(result, (item) => {
    const key = item.replace(/[-+ ]/g, '').split(':')[0];
    const file = item.startsWith('-') ? 'file1' : 'file2';
    return `${key}_${file}`;
  });
  return sortedResult.join('\n');
};

export default genDiff;
