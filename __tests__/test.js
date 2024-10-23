import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/gendifflogic.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('testing parser for non format', () => {
  expect(() => genDiff(getFixturePath('file5.txt'), getFixturePath('file6.txt'))).toThrow(Error('Non supported format of file'));
});

test('testing gendiff courser', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(getContent('resultStylish.txt'));
});

test('testing gendiff yaml', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'))).toBe(getContent('resultStylish.txt'));
});

test('testing getformatter', () => {
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'konobaka')).toThrow(Error('Unknown format: konobaka'));
});

test('testing gendiff plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(getContent('resultPlain.txt'));
});

test('testing gendiff plain yml', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'plain')).toBe(getContent('resultPlain.txt'));
});

test('testing json formatter', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(getContent('resultJson.txt'));
});
