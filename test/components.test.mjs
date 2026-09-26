import test from 'node:test'
import assert from 'node:assert/strict'

import {
  renderButton,
  renderPreheaderLink,
  renderStarRating,
} from '../src/components/primitives.js'
import {
  renderNlHeader,
  renderOneColumnOnePost,
  renderThreeColumnThreePost,
  renderTwoColumnTwoPost,
} from '../src/components/modules.js'
import { logo, post, starIcons, threeLinks } from '../scripts/fixture-data.mjs'

test('button uses the 16 px CTA contract and rejects unsafe URLs', () => {
  const html = renderButton({ label: 'Read more', href: 'https://example.com/read', width: 'fixed' })
  assert.match(html, /font-size:16px/)
  assert.match(html, /height="48"/)
  assert.throws(() => renderButton({ label: 'Unsafe', href: 'javascript:alert(1)' }), /http or https/)
})

test('preheader primitive is a single centered link with no presentation wrapper', () => {
  const html = renderPreheaderLink({ label: 'View online', href: 'https://example.com/view' })
  assert.equal((html.match(/<a\b/g) ?? []).length, 1)
  assert.match(html, /align="center"/)
  assert.doesNotMatch(html, /bgcolor=/)
  assert.doesNotMatch(html, /padding:/)
})

test('star rating enforces compact 16 px and standard 20 px icons', () => {
  const compact = renderStarRating({ value: 4.5, icons: starIcons, size: 'compact' })
  const standard = renderStarRating({ value: 4.5, icons: starIcons, size: 'standard' })
  assert.equal((compact.match(/width="16"/g) ?? []).length, 5)
  assert.equal((standard.match(/width="20"/g) ?? []).length, 5)
  assert.doesNotMatch(compact + standard, /width="2[1-9]"/)
  assert.match(compact, /background-color:transparent/)
})

test('nl-header omits preheader and supports all three content states', () => {
  const standard = renderNlHeader({ content: 'standard', logo, title: 'Daily recipes', tagline: 'Cook something good' })
  const logoOnly = renderNlHeader({ content: 'logo-only', logo })
  const imageOnly = renderNlHeader({ content: 'image-only', image: { src: 'https://placehold.co/1400x184', href: 'https://example.com', alt: 'Featured collection' } })
  assert.doesNotMatch(standard, /Preheader/i)
  assert.match(standard, /Daily recipes/)
  assert.doesNotMatch(logoOnly, /Daily recipes/)
  assert.match(imageOnly, /width="700" class="responsive-image"/)
})

test('the four public modules render responsive table markup', () => {
  const one = renderOneColumnOnePost({ post: post(1) })
  const two = renderTwoColumnTwoPost({ sectionTitle: 'Two posts', posts: [post(1), post(2)], links: threeLinks })
  const three = renderThreeColumnThreePost({ sectionTitle: 'Three posts', posts: [post(1), post(2), post(3)], links: threeLinks })
  for (const html of [one, two, three]) {
    assert.match(html, /role="presentation"/)
    assert.doesNotMatch(html, /display\s*:\s*(flex|grid)/i)
    assert.doesNotMatch(html, /href=""/)
  }
  assert.match(two, /width="314"/)
  assert.match(three, /width="201"/)
  assert.doesNotMatch(three, /Star_Icon\.png" width="24"/)
})

test('copy is escaped before entering email markup', () => {
  const html = renderOneColumnOnePost({ post: post(1, { headline: '<script>alert(1)</script>' }) })
  assert.doesNotMatch(html, /<script>/)
  assert.match(html, /&lt;script&gt;/)
})
