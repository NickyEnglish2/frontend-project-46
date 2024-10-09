import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formatters = {
  stylish: stylishFormat,
  plain: plainFormat,
  json: jsonFormat,
};

const getFormatter = (format) => {
  if (!formatters[format]) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatters[format];
};

export default getFormatter;
