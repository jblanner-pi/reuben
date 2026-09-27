import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { assembleReubenEmail } from '../src/reuben-framework.js'

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = join(repositoryRoot, 'fixtures', 'generated')

const fixtures = {
  'standard-one-column.html': {
    title: 'Reuben source framework: standard header and one-column post',
    moduleIds: ['header-solid-background', '1col_1post_full-width'],
  },
  'standard-two-column.html': {
    title: 'Reuben source framework: standard header and two-column posts',
    moduleIds: ['header-solid-background', '2col_2post'],
  },
  'image-three-column.html': {
    title: 'Reuben source framework: image-background header and three-column posts',
    moduleIds: ['header-image-background', '3col_3post'],
  },
}

await mkdir(outputDirectory, { recursive: true })
await Promise.all(Object.entries(fixtures).map(async ([name, definition]) => {
  const html = await assembleReubenEmail(definition)
  await writeFile(join(outputDirectory, name), `${html}\n`, 'utf8')
}))

console.log(`Built ${Object.keys(fixtures).length} source-backed fixtures in ${outputDirectory}`)
