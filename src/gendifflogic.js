import _ from 'lodash';
import path from 'path';
import parseFileJson from './parse_json.js';
import parseFileYaml from './parse_yml.js';

const getParsingFiles = (filePath) => {
  const fileExtension = path.extname(filePath);

  if (fileExtension === '.json') {
    return parseFileJson(filePath);
  } if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return parseFileYaml(filePath);
  }

  throw new Error('Non supported format');
};

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
  const parsedFile1 = getParsingFiles(file1);
  const parsedFile2 = getParsingFiles(file2);
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
