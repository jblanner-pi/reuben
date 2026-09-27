import { mkdir } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const fixtures = ['standard-one-column', 'standard-two-column', 'image-three-column']
const viewports = [
  { name: 'desktop', width: 900, height: 1200 },
  { name: 'mobile', width: 390, height: 1400 },
]
const outputDirectory = '/private/tmp/reuben-fixture-captures'

await mkdir(outputDirectory, { recursive: true })
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})

const results = []
for (const fixture of fixtures) {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport })
    await page.goto(`http://127.0.0.1:4173/fixtures/generated/${fixture}.html`, { waitUntil: 'domcontentloaded' })
    const metrics = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.getBoundingClientRect().width,
      tablesWithoutRole: [...document.querySelectorAll('table')].filter(table => table.getAttribute('role') !== 'presentation').length,
      starWidths: [...document.querySelectorAll('img[src*="Star_Icon"]')].map(image => Math.round(image.getBoundingClientRect().width)),
    }))
    const path = `${outputDirectory}/${fixture}-${viewport.name}.png`
    await page.screenshot({ path, fullPage: true })
    results.push({ fixture, viewport: viewport.name, path, ...metrics })
    await page.close()
  }
}

await browser.close()
console.log(JSON.stringify(results, null, 2))
