import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  const fileExtension = path.extname(absolutePath);

  const parsedData = (() => {
    switch (fileExtension) {
      case '.json':
        return JSON.parse(fileContent);
      case '.yml':
      case '.yaml':
        return yaml.parse(fileContent);
      default:
        return fileContent;
    }
  })();

  return parsedData;
};

export default parseFile;
