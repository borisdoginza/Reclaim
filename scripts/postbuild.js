import { copyFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const builtIndex = resolve(projectRoot, 'dist', 'index.html')
const notFoundPage = resolve(projectRoot, 'dist', '404.html')

await copyFile(builtIndex, notFoundPage)
console.log('Copied dist/index.html to dist/404.html for GitHub Pages routing.')
