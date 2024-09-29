import _ from 'lodash';

const compareValues = (unitedKeys, obj1, obj2, depth = 1) => {
  const sortedKeys = _.sortBy(unitedKeys);

  const indentSize = 1;
  const currentIndent = '  '.repeat(indentSize * depth);

  const result = sortedKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`${currentIndent}  ${key}: ${obj1[key]}`);
      } else {
        acc.push(`${currentIndent}- ${key}: ${obj1[key]}`);
        acc.push(`${currentIndent}+ ${key}: ${obj2[key]}`);
      }
    } else if (_.has(obj1, key)) {
      acc.push(`${currentIndent}- ${key}: ${obj1[key]}`);
    } else if (_.has(obj2, key)) {
      acc.push(`${currentIndent}+ ${key}: ${obj2[key]}`);
    }
    return acc;
  }, []);

  return result.join('\n');
};

export default compareValues;
