import yaml from 'js-yaml';

const parser = (fileContent, fileFormat) => {
  if (fileFormat === 'json') {
    return JSON.parse(fileContent);
  }

  if (fileFormat === 'yml' || fileFormat === 'yaml') {
    return yaml.load(fileContent);
  }

  throw new Error('Non supported format of file');
};

export default parser;
