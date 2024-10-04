import compareValues from './compareValues.js';

const formattingDiff = (key, obj1, obj2, diffType) => {
  const value1 = obj1[key];
  const value2 = obj2[key];

  switch (diffType) {
    case 'nested':
      return {
        key,
        type: 'nested',
        children: compareValues(value1, value2),
      };
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
};

export default formattingDiff;
