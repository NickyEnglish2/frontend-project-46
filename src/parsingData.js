import parseFileJson from './parse_json.js';
import parseFileYaml from './parse_yml.js';

const parsingData = (fileData) => {
  const trimmedData = fileData.trim();
  if (trimmedData.startsWith('{') || trimmedData.startsWith('[')) {
    return parseFileJson(fileData);
  }

  if (trimmedData.startsWith('---') || /([a-zA-Z0-9]+:)/.test(trimmedData)) {
    return parseFileYaml(fileData);
  }

  throw new Error('Non supported format');
};

export default parsingData;
