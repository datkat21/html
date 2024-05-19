import fs from 'fs';
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const compiledJsPath = path.join(__dirname, "./dist/html.js");
export const compiledJsContent = fs.readFileSync(compiledJsPath, "utf-8");
