import yaml from 'js-yaml';

const parseFileYaml = (fileContent) => {
  const parsedData = yaml.load(fileContent);

  return parsedData;
};

export default parseFileYaml;
