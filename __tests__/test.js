import genDiff from '../src/gendifflogic.js';
import parseFile from '../src/parse_json.js';
import parseFileYaml from '../src/parse_yml.js';

test('testing gendiff', () => {
  const gendiffResult = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
 `;

  const jsonResult = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(jsonResult.trim()).toEqual(gendiffResult.trim());
});

test('testing gendiff yml', () => {
  const gendiffYaml = `
{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
  `;

  const yamlResult = genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml');
  expect(yamlResult.trim()).toBe(gendiffYaml.trim());
});

test('testing parseFile', () => {
  expect(parseFile('__fixtures__/file1.json')).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});

test('testing parseFile yml', () => {
  expect(parseFileYaml('__fixtures__/file3.yml')).toEqual({
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  });
});

test('testing parser for non format', () => {
  expect(() => genDiff('__fixtures__/file5.txt', '__fixtures__/file6.txt')).toThrow(Error('Non supported format'));
});

test('testing gendiff courser', () => {
  const courserResult = `
  {
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
  }
  `;
  expect(genDiff('__fixtures__/file_recourse_1.json', '__fixtures__/file_recourse_2.json')).toBe(courserResult);
});
