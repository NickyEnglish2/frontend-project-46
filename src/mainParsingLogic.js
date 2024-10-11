import fs from 'fs';
import path from 'path';
import parsingData from './parsingData.js';

const mainParsingLogic = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = fs.readFileSync(absolutePath, 'utf-8');

  const parsedData = parsingData(fileContent);

  return parsedData;
};

export default mainParsingLogic;
