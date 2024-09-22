import genDiff from '../src/gendifflogic.js';
import parseFile from '../src/parse.js';

test('testing gendiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe('- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true');
});

test('testing gendiff yml', () => {
  expect(genDiff('__fixtures__/file3.yml', '__fixtures__/file4.yml')).toBe('- name: profile\n  name: login\n+ name: foo\n- port: 8090\n  port: 8080\n+ port: 8010');
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
  /* eslint-disable-next-line */
  const expected = {"apis": [{"name": "login", "port": 8080}, {"name": "profile", "port": 8090}]};
  expect(parseFile('__fixtures__/file3.yml')).toEqual(expected);
});

test('testing parseFile txt', () => {
  expect(parseFile('__fixtures__/file5.txt')).toEqual('name: cindy\nlocation: Moscow\ntype: cat');
});
