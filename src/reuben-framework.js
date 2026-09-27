import { readFile } from 'node:fs/promises'
import { dirname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const catalogPath = join(repositoryRoot, 'mapping', 'reuben-source-catalog.json')

function repositoryPath(relativePath) {
  const normalizedPath = normalize(relativePath)
  if (!normalizedPath.startsWith('source/reuben/') || normalizedPath.includes('..')) {
    throw new TypeError(`Reuben source path is outside the read-only source snapshot: ${relativePath}`)
  }
  return join(repositoryRoot, normalizedPath)
}

export function extractBodyFragment(document, sourceLabel = 'Reuben source document') {
  const bodyStart = document.match(/<body\b[^>]*>/i)
  const bodyEndIndex = document.search(/<\/body\s*>/i)
  if (!bodyStart || bodyStart.index === undefined || bodyEndIndex < 0) {
    throw new TypeError(`${sourceLabel} must contain a body element`)
  }
  const contentStart = bodyStart.index + bodyStart[0].length
  if (bodyEndIndex <= contentStart) {
    throw new TypeError(`${sourceLabel} has an empty or malformed body element`)
  }
  return document.slice(contentStart, bodyEndIndex).trim()
}

export function replaceBetweenMarkers(document, startMarker, endMarker, replacement) {
  const startIndex = document.indexOf(startMarker)
  const endIndex = document.indexOf(endMarker)
  if (startIndex < 0 || endIndex < 0 || endIndex <= startIndex) {
    throw new TypeError('Base template is missing ordered assembly markers')
  }
  const insertionIndex = startIndex + startMarker.length
  return `${document.slice(0, insertionIndex)}\n\n${replacement.trim()}\n\n${document.slice(endIndex)}`
}

export async function getReubenSourceCatalog() {
  return JSON.parse(await readFile(catalogPath, 'utf8'))
}

export async function loadReubenModule(moduleId) {
  const catalog = await getReubenSourceCatalog()
  const moduleDefinition = catalog.modules[moduleId]
  if (!moduleDefinition) throw new TypeError(`Unknown Reuben module: ${moduleId}`)
  const sourceDocument = await readFile(repositoryPath(moduleDefinition.source), 'utf8')
  return {
    id: moduleId,
    ...moduleDefinition,
    html: extractBodyFragment(sourceDocument, moduleDefinition.source),
  }
}

export async function resolveFigmaModule(figmaComponent, variant) {
  const catalog = await getReubenSourceCatalog()
  const definition = catalog.figmaVariants[figmaComponent]
  if (!definition) throw new TypeError(`Unknown Figma component: ${figmaComponent}`)
  const resolved = variant ? definition[variant] : definition
  if (!resolved) throw new TypeError(`Unknown ${figmaComponent} variant: ${variant}`)
  return { figmaComponent, variant: variant ?? null, ...resolved }
}

export async function assembleReubenEmail({ moduleIds, title = '' }) {
  if (!Array.isArray(moduleIds) || moduleIds.length === 0) {
    throw new TypeError('moduleIds must contain at least one Reuben source module')
  }

  const catalog = await getReubenSourceCatalog()
  const baseTemplate = await readFile(repositoryPath(catalog.baseTemplate), 'utf8')
  const modules = await Promise.all(moduleIds.map(loadReubenModule))
  const assembledModules = modules.map(module => `<!-- reuben-source:start ${module.source} -->\n${module.html}\n<!-- reuben-source:end ${module.source} -->`).join('\n\n')
  const assembled = replaceBetweenMarkers(
    baseTemplate,
    catalog.insertion.startMarker,
    catalog.insertion.endMarker,
    assembledModules,
  )
  const safeTitle = String(title).replace(/[<>&]/g, '')
  return assembled.replace(/<title>[^<]*<\/title>/i, `<title>${safeTitle}</title>`)
}
