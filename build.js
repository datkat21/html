import * as esbuild from 'esbuild'

import { compiledJsPath, compiledJsContent } from './env.js'

await esbuild.build({
  entryPoints: [compiledJsPath],
  minify: true,
  outfile: './dist/html.min.js',
})

console.log(`Building complete. Wrote to ${compiledJsPath}`)