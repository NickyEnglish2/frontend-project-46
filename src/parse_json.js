const parseFileJson = (fileContent) => {
  const parsedData = JSON.parse(fileContent);

  return parsedData;
};

export default parseFileJson;
