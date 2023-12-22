import { format } from 'prettier';
import path from 'node:path';
import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild'
const __dirname = dirname(fileURLToPath(import.meta.url));

const compiledJsPath = path.join(__dirname, './dist/html.js');
const compiledJsContent = fs.readFileSync(compiledJsPath, 'utf-8');

const formattedResult = await format(compiledJsContent, {
  parser: 'babel-ts',
  tabWidth: 2,
  filepath: compiledJsPath,
});

fs.writeFileSync(compiledJsPath, formattedResult);

await esbuild.build({
  entryPoints: ['./dist/html.js'],
  minify: true,
  outfile: './dist/html.min.js',
})

console.log(`Formatting (and building) complete. Wrote to ${compiledJsPath}`)