import _ from 'lodash';

const indent = (depth, indentSize = 4) => ' '.repeat(indentSize * depth);

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const entries = Object.entries(value).map(
      ([key, val]) => `${indent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`,
    );
    return `{\n${entries.join('\n')}\n${indent(depth)}}`;
  }

  return value;
};

const stylishFormat = (diffData, depth = 1) => {
  const finalResult = diffData.flatMap((node) => {
    const currentIndent = indent(depth);
    const markerIndent = currentIndent.slice(2);
    const nextDepth = depth + 1;

    switch (node.type) {
      case 'nested':
        return `${currentIndent}${node.key}: {\n${stylishFormat(node.children, nextDepth)}\n${currentIndent}}`;
      case 'added':
        return `${markerIndent}+ ${node.key}: ${formatValue(node.value, nextDepth)}`;
      case 'removed':
        return `${markerIndent}- ${node.key}: ${formatValue(node.value, nextDepth)}`;
      case 'changed':
        return [
          `${markerIndent}- ${node.key}: ${formatValue(node.oldValue, nextDepth)}`,
          `${markerIndent}+ ${node.key}: ${formatValue(node.newValue, nextDepth)}`,
        ];
      case 'unchanged':
        return `${currentIndent}${node.key}: ${formatValue(node.value, nextDepth)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${finalResult.join('\n')}\n}`;
};

export default stylishFormat;
