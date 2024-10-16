import _ from 'lodash';

const compareValues = (obj1, obj2) => {
  const unitedKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(unitedKeys);

  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    const diffType = (() => {
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
    })();

    switch (diffType) {
      case 'nested':
        return { key, type: 'nested', children: compareValues(value1, value2) };
      case 'added':
        return { key, type: 'added', value: value2 };
      case 'removed':
        return { key, type: 'removed', value: value1 };
      case 'changed':
        return {
          key,
          type: 'changed',
          oldValue: value1,
          newValue: value2,
        };
      case 'unchanged':
      default:
        return { key, type: 'unchanged', value: value1 };
    }
  });
};

export default compareValues;
