import _ from 'lodash';

const isComplex = (value) => _.isObject(value) && !_.isArray(value) && !_.isNull(value);

const formatValue = (value) => {
  if (isComplex(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : String(value);
};

const plainFormat = (diffData, parent = '') => {
  const result = diffData.flatMap((entry) => {
    const fullPath = parent ? `${parent}.${entry.key}` : entry.key;

    switch (entry.type) {
      case 'nested':
        return plainFormat(entry.children, fullPath);
      case 'added':
        return `Property '${fullPath}' was added with value: ${formatValue(entry.value)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'changed':
        return `Property '${fullPath}' was updated. From ${formatValue(entry.firstValue)} to ${formatValue(entry.secondValue)}`;
      default:
        return [];
    }
  });

  return result.join('\n');
};

export default plainFormat;
