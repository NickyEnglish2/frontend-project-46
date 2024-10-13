import fs from 'fs';
import path from 'path';
import parser from './parsers.js';
import getFormatter from './formatters/getFormatter.js';
import compareValues from './compareValues.js';

const extractingContent = (file) => {
  const absolutePath = path.resolve(process.cwd(), file);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  return fileContent;
};

const genDiff = (file1, file2, format = 'stylish') => {
  const content1 = extractingContent(file1);
  const content2 = extractingContent(file2);

  const parsedFile1 = parser(content1);
  const parsedFile2 = parser(content2);

  const result = compareValues(parsedFile1, parsedFile2);

  const formatter = getFormatter(format);

  return formatter(result);
};

export default genDiff;
