import { format } from 'prettier';
import path from 'node:path';
import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const compiledJsPath = path.join(__dirname, './dist/html.js');
const compiledJsContent = fs.readFileSync(compiledJsPath, 'utf-8');

const result = await format(compiledJsContent, {
  parser: 'babel-ts',
  tabWidth: 2,
  filepath: compiledJsPath
});

fs.writeFileSync(compiledJsPath, result);