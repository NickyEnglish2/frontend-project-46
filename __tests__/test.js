import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendifflogic.js';
import { result1, result2, result3 } from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('testing parser for non format', () => {
  expect(() => genDiff(getFixturePath('file5.txt'), getFixturePath('file6.txt'))).toThrow(Error('Non supported format of file'));
});

test('testing gendiff courser', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(result1);
});

test('testing gendiff yaml', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'))).toBe(result1);
});

test('testing getformatter', () => {
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'konobaka')).toThrow(Error('Unknown format: konobaka'));
});

test('testing gendiff plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(result2);
});

test('testing gendiff plain yml', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'plain')).toBe(result2);
});

test('testing json formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(result3);
});
