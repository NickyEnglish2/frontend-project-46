import _ from 'lodash';
import formattingDiff from './formattingDiff.js';

const getTypeOfDiff = (obj1, obj2, key) => {
  const value1 = obj1[key];
  const value2 = obj2[key];

  if (!_.has(obj1, key)) {
    return 'added';
  }
  if (!_.has(obj2, key)) {
    return 'removed';
  }
  if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
    return 'nested';
  }
  if (!_.isEqual(value1, value2)) {
    return 'changed';
  }

  return 'unchanged';
};

const compareValues = (obj1, obj2) => {
  const unitedKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(unitedKeys);

  const comparedKeys = sortedKeys.map((key) => {
    const diffType = getTypeOfDiff(obj1, obj2, key);

    if (diffType === 'nested') {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const children = compareValues(value1, value2);
      return { ...formattingDiff(key, obj1, obj2, diffType), children };
    }

    return formattingDiff(key, obj1, obj2, diffType);
  });

  return comparedKeys;
};

export default compareValues;
