import _ from 'lodash';

const compareValues = (obj1, obj2) => {
  const unitedKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(unitedKeys);

  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: compareValues(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key,
        type: 'changed',
        firstValue: value1,
        secondValue: value2,
      };
    }
    return { key, type: 'unchanged', value: value1 };
  });
};

export default compareValues;
