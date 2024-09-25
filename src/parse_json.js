import fs from 'fs';
import path from 'path';

const parseFileJson = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  const parsedData = JSON.parse(fileContent);

  return parsedData;
};

export default parseFileJson;
