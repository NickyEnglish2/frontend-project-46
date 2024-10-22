import _ from 'lodash';

const jsonFormat = (diffData) => {
  const formatNode = (node) => {
    switch (node.type) {
      case 'nested':
        return {
          key: node.key,
          type: node.type,
          children: _.map(node.children, formatNode),
        };
      case 'added':
      case 'removed':
      case 'unchanged':
        return _.pick(node, ['key', 'type', 'value']);
      default:
        return _.pick(node, ['key', 'type', 'value', 'value1']);
    }
  };

  const formattedDiff = _.reduce(diffData, (acc, node) => ({
    ...acc,
    [node.key]: formatNode(node),
  }), {});

  return JSON.stringify(formattedDiff, null, 2);
};

export default jsonFormat;
