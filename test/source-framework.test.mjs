import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  assembleReubenEmail,
  extractBodyFragment,
  getReubenSourceCatalog,
  loadReubenModule,
  replaceBetweenMarkers,
  resolveFigmaModule,
} from '../src/reuben-framework.js'

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

test('catalog points only to the read-only Reuben source snapshot', async () => {
  const catalog = await getReubenSourceCatalog()
  assert.match(catalog.baseTemplate, /^source\/reuben\//)
  for (const definition of Object.values(catalog.modules)) {
    assert.match(definition.source, /^source\/reuben\//)
    assert.doesNotMatch(definition.source, /\.\./)
  }
})

test('body extraction removes document wrappers without changing component markup', async () => {
  const sourcePath = join(repositoryRoot, 'source/reuben/content-blocks/reuben-1col-1post-full-width.html')
  const sourceDocument = await readFile(sourcePath, 'utf8')
  const module = await loadReubenModule('1col_1post_full-width')
  assert.equal(module.html, extractBodyFragment(sourceDocument, sourcePath))
  assert.match(module.html, /<!--1 Post, Full Width-->/)
  assert.doesNotMatch(module.html, /<!doctype html>/i)
})

test('assembly preserves the base template outside its documented insertion markers', async () => {
  const catalog = await getReubenSourceCatalog()
  const base = await readFile(join(repositoryRoot, catalog.baseTemplate), 'utf8')
  const replacement = '<table role="presentation"><tr><td>source fragment</td></tr></table>'
  const assembled = replaceBetweenMarkers(base, catalog.insertion.startMarker, catalog.insertion.endMarker, replacement)
  const [basePrefix] = base.split(catalog.insertion.startMarker)
  const baseSuffix = base.slice(base.indexOf(catalog.insertion.endMarker))
  assert.equal(assembled.slice(0, basePrefix.length), basePrefix)
  assert.ok(assembled.endsWith(baseSuffix))
  assert.match(assembled, /source fragment/)
})

test('assembled fixtures embed exact source bodies with provenance boundaries', async () => {
  const moduleIds = ['header-solid-background', '1col_1post_full-width']
  const html = await assembleReubenEmail({ moduleIds, title: 'Source-backed test' })
  for (const moduleId of moduleIds) {
    const module = await loadReubenModule(moduleId)
    assert.ok(html.includes(module.html))
    assert.ok(html.includes(`reuben-source:start ${module.source}`))
  }
  assert.match(html, /<title>Source-backed test<\/title>/)
  assert.match(html, /@media \(max-width:480px\)/)
})

test('Figma mapping exposes unsupported design variants instead of fabricating HTML', async () => {
  const standard = await resolveFigmaModule('nl-header', 'Standard')
  const logoOnly = await resolveFigmaModule('nl-header', 'Logo-only')
  const imageOnly = await resolveFigmaModule('nl-header', 'Image-only')
  assert.equal(standard.moduleId, 'header-solid-background')
  assert.equal(logoOnly.support, 'design-only-gap')
  assert.equal(logoOnly.moduleId, null)
  assert.equal(imageOnly.support, 'design-only-gap')
  assert.equal(imageOnly.moduleId, null)
  assert.equal(imageOnly.nearestModuleId, 'header-image-background')
})

test('star sizing records the remaining 20 px source gaps after Figma standardized on 24 px', async () => {
  const catalog = await getReubenSourceCatalog()
  const oneColumn = await loadReubenModule('1col_1post_full-width')
  const module = await loadReubenModule('3col_3post')
  assert.match(oneColumn.html, /Star_Icon\.png" width="20"/)
  assert.match(module.html, /Star_Icon\.png" width="24"/)
  assert.ok(catalog.modules['1col_1post_full-width'].knownGaps.some(gap => gap.includes('20 px')))
  assert.equal(catalog.modules['3col_3post'].knownGaps.length, 0)
})
