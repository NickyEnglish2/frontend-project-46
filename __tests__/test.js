import genDiff from '../src/gendifflogic.js';
import parseFile from '../src/parse_json.js';
import parseFileYaml from '../src/parse_yml.js';

const result1 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const parseResult = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const plainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const gendiffResult = genDiff('__fixtures__/file_recourse_1.json', '__fixtures__/file_recourse_2.json');
const gendiffResultYml = genDiff('__fixtures__/file_recourse_1.yml', '__fixtures__/file_recourse_2.yml');
const gendiffResultWithPlain = genDiff('__fixtures__/file_recourse_1.json', '__fixtures__/file_recourse_2.json', 'plain');
const gendiffResultYmlPlain = genDiff('__fixtures__/file_recourse_1.yml', '__fixtures__/file_recourse_2.yml', 'plain');

test('testing parseFile', () => {
  expect(parseFile('__fixtures__/file1.json')).toEqual(parseResult);
});

test('testing parseFile yml', () => {
  expect(parseFileYaml('__fixtures__/file3.yml')).toEqual(parseResult);
});

test('testing parser for non format', () => {
  expect(() => genDiff('__fixtures__/file5.txt', '__fixtures__/file6.txt')).toThrow(Error('Non supported format'));
});

test('testing gendiff courser', () => {
  expect(gendiffResult).toBe(result1);
});

test('testing gendiff yaml', () => {
  expect(gendiffResultYml).toBe(result1);
});

test('testing getformatter', () => {
  expect(() => genDiff('__fixtures__/file_recourse_1.json', '__fixtures__/file_recourse_2.json', 'konobaka')).toThrow(Error('Unknown format: konobaka'));
});

test('testing gendiff plain', () => {
  expect(gendiffResultWithPlain).toBe(plainResult);
});

test('testing gendiff plain yml', () => {
  expect(gendiffResultYmlPlain).toBe(plainResult);
});
