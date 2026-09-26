import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { renderPreheaderLink } from '../src/components/primitives.js'
import {
  renderNlHeader,
  renderOneColumnOnePost,
  renderThreeColumnThreePost,
  renderTwoColumnTwoPost,
} from '../src/components/modules.js'
import { renderEmailDocument } from '../src/email-document.js'
import { logo, post, threeLinks } from './fixture-data.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = join(root, 'fixtures', 'generated')
const css = await readFile(join(root, 'src', 'styles', 'reuben-email.css'), 'utf8')

const preheader = ({ label, href, background = '#FFFFFF' }) => `<table role="presentation" border="0" cellspacing="0" cellpadding="0" width="700" align="center" class="wrap" bgcolor="${background}" style="background-color:${background};"><tr><td align="center" style="padding:8px 24px;">${renderPreheaderLink({ label, href })}</td></tr></table>`
const spacer = '<table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%"><tr><td height="32" style="font-size:1px;line-height:32px;">&nbsp;</td></tr></table>'

const fixtures = {
  'standard-one-column.html': renderEmailDocument({
    title: 'Reuben standard one-column fixture',
    previewText: 'Standard header and full-width post QA fixture.',
    css,
    body: `${preheader({ label: 'View this email in your browser', href: 'https://example.com/view-online' })}
${renderNlHeader({ content: 'standard', logo, title: 'Recipe of the Day', tagline: 'A tested favorite for tonight' })}
${spacer}
${renderOneColumnOnePost({ post: post(1, { links: threeLinks.slice(0, 2) }) })}`,
  }),
  'logo-two-column.html': renderEmailDocument({
    title: 'Reuben logo-only two-column fixture',
    previewText: 'Logo-only header and two-column post QA fixture.',
    css,
    body: `${preheader({ label: 'Open the online version', href: 'https://example.com/view-online/two-column' })}
${renderNlHeader({ content: 'logo-only', logo, backgroundColor: '#FFFFFF' })}
${spacer}
${renderTwoColumnTwoPost({ sectionTitle: 'Two ideas for tonight', posts: [post(1), post(2)], links: threeLinks })}`,
  }),
  'image-three-column.html': renderEmailDocument({
    title: 'Reuben image-only three-column fixture',
    previewText: 'Image-only header and three-column post QA fixture.',
    css,
    body: `${renderNlHeader({
      content: 'image-only',
      image: {
        src: 'https://placehold.co/1400x184/png?text=Full-width+header',
        href: 'https://example.com/newsletters/featured',
        alt: 'Featured recipe collection',
      },
    })}
${spacer}
${renderThreeColumnThreePost({
      sectionTitle: 'Three reader favorites',
      posts: [
        post(1),
        post(2, { copy: null, moniker: null }),
        post(3, { headline: 'An intentionally long headline that verifies wrapping in narrow and stacked layouts' }),
      ],
      links: threeLinks,
    })}`,
  }),
}

await mkdir(outputDirectory, { recursive: true })
await Promise.all(Object.entries(fixtures).map(([name, html]) => writeFile(join(outputDirectory, name), `${html}\n`, 'utf8')))
console.log(`Built ${Object.keys(fixtures).length} fixtures in ${outputDirectory}`)
