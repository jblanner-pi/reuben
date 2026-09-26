import { readFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const directory = join(root, 'fixtures', 'generated')
const names = (await readdir(directory)).filter(name => name.endsWith('.html')).sort()
const failures = []

for (const name of names) {
  const html = await readFile(join(directory, name), 'utf8')
  const checks = [
    ['contains the 480 px responsive breakpoint', /max-width:\s*480px/i.test(html)],
    ['contains a 700 px email container', /width="700"/.test(html)],
    ['contains no empty href', !/href="\s*"/.test(html)],
    ['contains no JavaScript URLs', !/href="javascript:/i.test(html)],
    ['contains no flexbox', !/display\s*:\s*flex/i.test(html)],
    ['contains no CSS grid', !/display\s*:\s*grid/i.test(html)],
    ['contains no legacy 24 px stars', !/Star_Icon\.png" width="24"/i.test(html)],
    ['uses presentation roles on every table', (html.match(/<table\b/gi) ?? []).length === (html.match(/<table\b[^>]*role="presentation"/gi) ?? []).length],
  ]
  for (const [label, passed] of checks) {
    if (!passed) failures.push(`${name}: ${label}`)
  }

  for (const match of html.matchAll(/Star_Icon\.png"[^>]*width="(\d+)"/gi)) {
    if (Number(match[1]) > 20) failures.push(`${name}: star width ${match[1]} exceeds 20 px`)
  }
}

if (names.length !== 3) failures.push(`expected 3 fixtures, found ${names.length}`)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Static QA passed for ${names.length} fixtures`)
}
