import _ from 'lodash';
import path from 'path';
import parseFileJson from './parse_json.js';
import parseFileYaml from './parse_yml.js';
import getFormatter from './getFormatter.js';
import compareValues from './compareValues.js';

const getParsingFiles = (filePath) => {
  const fileExtension = path.extname(filePath);

  if (fileExtension === '.json') {
    return parseFileJson(filePath);
  } if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return parseFileYaml(filePath);
  }

  throw new Error('Non supported format');
};

const genDiff = (file1, file2, format = 'stylish') => {
  const parsedFile1 = getParsingFiles(file1);
  const parsedFile2 = getParsingFiles(file2);
  const allKeysUnited = _.union(_.keys(parsedFile1), _.keys(parsedFile2));

  const result = compareValues(allKeysUnited, parsedFile1, parsedFile2);

  const formatter = getFormatter(format);

  return formatter(result);
};

export default genDiff;
