import { readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const directory = join(repositoryRoot, 'fixtures', 'generated')
const names = (await readdir(directory)).filter(name => name.endsWith('.html')).sort()
const failures = []
const warnings = []

for (const name of names) {
  const html = await readFile(join(directory, name), 'utf8')
  const checks = [
    ['contains a complete HTML document', /<!doctype html>/i.test(html) && /<\/html>/i.test(html)],
    ['contains the canonical 480 px responsive breakpoint', /max-width:\s*480px/i.test(html)],
    ['contains a 700 px email container', /width="700"/.test(html)],
    ['contains source provenance markers', /<!-- reuben-source:start source\/reuben\//.test(html)],
    ['contains no flexbox', !/display\s*:\s*flex/i.test(html)],
    ['contains no CSS grid', !/display\s*:\s*grid/i.test(html)],
  ]
  for (const [label, passed] of checks) {
    if (!passed) failures.push(`${name}: ${label}`)
  }

  const emptyLinks = (html.match(/href="\s*"/gi) ?? []).length
  const insecureImages = (html.match(/src="http:\/\//gi) ?? []).length
  const nonstandardStars = (html.match(/Star_Icon\.png"[^>]*width="20"/gi) ?? []).length
  const tables = (html.match(/<table\b/gi) ?? []).length
  const presentationTables = (html.match(/<table\b[^>]*role="presentation"/gi) ?? []).length

  if (emptyLinks) warnings.push(`${name}: ${emptyLinks} empty authoring link(s) inherited from canonical source`)
  if (insecureImages) warnings.push(`${name}: ${insecureImages} HTTP image URL(s) inherited from canonical source`)
  if (nonstandardStars) warnings.push(`${name}: ${nonstandardStars} canonical 20 px star image(s); Figma now standardizes stars at 24 px`)
  if (tables !== presentationTables) warnings.push(`${name}: ${tables - presentationTables} table(s) lack role="presentation" in canonical source`)
}

if (names.length !== 3) failures.push(`expected 3 fixtures, found ${names.length}`)

if (warnings.length) {
  console.warn(`Known source warnings:\n${warnings.map(item => `- ${item}`).join('\n')}`)
}

if (failures.length) {
  console.error(`Static QA failures:\n${failures.map(item => `- ${item}`).join('\n')}`)
  process.exitCode = 1
} else {
  console.log(`Static QA passed for ${names.length} source-backed fixtures`)
}
