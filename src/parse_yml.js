import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFileYaml = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  const parsedData = yaml.load(fileContent);

  return parsedData;
};

export default parseFileYaml;
