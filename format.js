import path from 'node:path';
import fs from 'node:fs';

import { compiledJsPath, compiledJsContent } from './env.js'

import { format } from 'prettier';

const formattedResult = await format(compiledJsContent, {
  parser: 'babel-ts',
  tabWidth: 2,
  filepath: compiledJsPath,
});

fs.writeFileSync(compiledJsPath, formattedResult);

console.log(`Formatting complete. Wrote to ${compiledJsPath}`)