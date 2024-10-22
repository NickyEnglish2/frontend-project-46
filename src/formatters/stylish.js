import _ from 'lodash';

const indent = (depth, indentSize = 4) => ' '.repeat(indentSize * depth);

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const entries = Object.entries(value).map(
      ([key, val]) => `${indent(depth)}${key}: ${formatValue(val, depth + 1)}`,
    );
    return `{\n${entries.join('\n')}\n${indent(depth - 1)}}`;
  }

  return value;
};

const stylishFormat = (diffData) => {
  const formattingFunction = (data, depth = 1) => {
    const finalResult = data.flatMap((node) => {
      const currentIndent = indent(depth);
      const markerIndent = currentIndent.slice(2);
      const nextDepth = depth + 1;

      switch (node.type) {
        case 'nested':
          return `${currentIndent}${node.key}: {\n${formattingFunction(node.children, nextDepth)}\n${currentIndent}}`;
        case 'added':
          return `${markerIndent}+ ${node.key}: ${formatValue(node.value, nextDepth)}`;
        case 'removed':
          return `${markerIndent}- ${node.key}: ${formatValue(node.value, nextDepth)}`;
        case 'changed':
          return [
            `${markerIndent}- ${node.key}: ${formatValue(node.firstValue, nextDepth)}`,
            `${markerIndent}+ ${node.key}: ${formatValue(node.secondValue, nextDepth)}`,
          ].join('\n');
        default:
          return `${currentIndent}${node.key}: ${formatValue(node.value, nextDepth)}`;
      }
    });

    return finalResult.join('\n');
  };

  return `{\n${formattingFunction(diffData)}\n}`;
};

export default stylishFormat;
