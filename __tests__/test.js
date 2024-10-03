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

const result2 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const result3 = `Property 'common.follow' was added with value: false
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

const result4 = `{
  "common": {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "follow",
        "type": "added",
        "value": false
      },
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "type": "removed",
        "value": 200
      },
      {
        "key": "setting3",
        "type": "changed",
        "oldValue": true,
        "newValue": null
      },
      {
        "key": "setting4",
        "type": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "type": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "type": "nested",
        "children": [
          {
            "key": "doge",
            "type": "nested",
            "children": [
              {
                "key": "wow",
                "type": "changed",
                "oldValue": "",
                "newValue": "so much"
              }
            ]
          },
          {
            "key": "key",
            "type": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "type": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  "group1": {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "changed",
        "oldValue": "bas",
        "newValue": "bars"
      },
      {
        "key": "foo",
        "type": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "type": "changed",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str"
      }
    ]
  },
  "group2": {
    "key": "group2",
    "type": "removed",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  "group3": {
    "key": "group3",
    "type": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
}`;

const gendiffResult = genDiff('__fixtures__/file_recourse_1.json', '__fixtures__/file_recourse_2.json');
const gendiffResultYml = genDiff('__fixtures__/file_recourse_1.yml', '__fixtures__/file_recourse_2.yml');
const gendiffResultWithPlain = genDiff('__fixtures__/file_recourse_1.json', '__fixtures__/file_recourse_2.json', 'plain');
const gendiffResultYmlPlain = genDiff('__fixtures__/file_recourse_1.yml', '__fixtures__/file_recourse_2.yml', 'plain');

test('testing parseFile', () => {
  expect(parseFile('__fixtures__/file1.json')).toEqual(result2);
});

test('testing parseFile yml', () => {
  expect(parseFileYaml('__fixtures__/file3.yml')).toEqual(result2);
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
  expect(gendiffResultWithPlain).toBe(result3);
});

test('testing gendiff plain yml', () => {
  expect(gendiffResultYmlPlain).toBe(result3);
});

test('testing json formatter', () => {
  expect(genDiff('__fixtures__/file_recourse_1.json', '__fixtures__/file_recourse_2.json', 'json')).toBe(result4);
});
