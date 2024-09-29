import stylishFormat from './stylish.js';

const formatters = {
  stylish: stylishFormat,
};

const getFormatter = (format) => {
  if (!formatters[format]) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatters[format];
};

export default getFormatter;
