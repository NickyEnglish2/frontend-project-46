import mainParsingLogic from './mainParsingLogic.js';
import getFormatter from './formatters/getFormatter.js';
import compareValues from './compareValues.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const parsedFile1 = mainParsingLogic(file1);
  const parsedFile2 = mainParsingLogic(file2);

  const result = compareValues(parsedFile1, parsedFile2);

  const formatter = getFormatter(format);

  return formatter(result);
};

export default genDiff;
