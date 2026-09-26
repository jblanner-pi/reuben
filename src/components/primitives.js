import {
  absoluteUrl,
  escapeHtml,
  oneOf,
  optionalText,
  requiredText,
  tableAttributes,
} from './shared.js'

const MEDIA_WIDTHS = {
  full: 652,
  'two-column': 314,
  'three-column': 201,
}

export function renderButton({
  label,
  href,
  style = 'filled',
  width = 'content',
  fixedWidth = 160,
}) {
  const safeLabel = escapeHtml(requiredText(label, 'button.label'))
  const safeHref = escapeHtml(absoluteUrl(href, 'button.href'))
  const buttonStyle = oneOf(style, ['filled', 'outlined'], 'button.style')
  const buttonWidth = oneOf(width, ['content', 'fixed'], 'button.width')
  const resolvedWidth = buttonWidth === 'fixed' ? Number(fixedWidth) : null
  if (resolvedWidth !== null && (!Number.isFinite(resolvedWidth) || resolvedWidth < 80)) {
    throw new TypeError('button.fixedWidth must be at least 80')
  }

  const background = buttonStyle === 'filled' ? '#0053C0' : '#FFFFFF'
  const foreground = buttonStyle === 'filled' ? '#FFFFFF' : '#0D0D0D'
  const border = buttonStyle === 'outlined' ? 'border:3px solid #0053C0;' : ''
  return `<table ${tableAttributes(resolvedWidth || 'auto', 'align="center"')} style="border-collapse:separate;">
  <tr>
    <td align="center" height="48" bgcolor="${background}" style="${border}border-radius:4px;height:48px;mso-line-height-rule:exactly;">
      <a href="${safeHref}" style="background-color:${background};border-radius:4px;color:${foreground};display:inline-block;font-family:Arial,sans-serif;font-size:16px;font-weight:700;letter-spacing:1px;line-height:20px;padding:14px 24px;text-decoration:none;text-transform:uppercase;${resolvedWidth ? `width:${Math.max(resolvedWidth - 48, 32)}px;` : ''}"><!--[if mso]>&nbsp;<![endif]-->${safeLabel}<!--[if mso]>&nbsp;<![endif]--></a>
    </td>
  </tr>
</table>`
}

export function renderMedia({ src, alt, href, size = 'full' }) {
  const mediaSize = oneOf(size, Object.keys(MEDIA_WIDTHS), 'media.size')
  const width = MEDIA_WIDTHS[mediaSize]
  const safeSrc = escapeHtml(absoluteUrl(src, 'media.src'))
  const safeHref = escapeHtml(absoluteUrl(href, 'media.href'))
  const safeAlt = escapeHtml(String(alt ?? ''))

  return `<table ${tableAttributes(width, 'align="center" class="wrap"')}>
  <tr>
    <td align="center"><a href="${safeHref}"><img src="${safeSrc}" alt="${safeAlt}" width="${width}" class="responsive-image" style="border:0;display:block;height:auto;max-width:${width}px;width:100%;" /></a></td>
  </tr>
</table>`
}

export function renderStarRating({ value, icons, size = 'standard' }) {
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue) || numericValue < 0 || numericValue > 5) {
    throw new TypeError('rating.value must be between 0 and 5')
  }
  const ratingSize = oneOf(size, ['compact', 'standard'], 'rating.size')
  const iconWidth = ratingSize === 'compact' ? 16 : 20
  const sources = {
    full: escapeHtml(absoluteUrl(icons?.full, 'rating.icons.full')),
    half: escapeHtml(absoluteUrl(icons?.half, 'rating.icons.half')),
    empty: escapeHtml(absoluteUrl(icons?.empty, 'rating.icons.empty')),
  }
  const rounded = Math.round(numericValue * 2) / 2
  const cells = []
  for (let index = 1; index <= 5; index += 1) {
    const kind = rounded >= index ? 'full' : rounded >= index - 0.5 ? 'half' : 'empty'
    const rightPadding = index === 5 ? 8 : 3
    cells.push(`<td align="center" style="padding-right:${rightPadding}px;"><img src="${sources[kind]}" alt="" width="${iconWidth}" style="background-color:transparent;border:0;display:block;height:auto;max-width:${iconWidth}px;width:${iconWidth}px;" /></td>`)
  }

  return `<table ${tableAttributes('auto', 'align="center"')} aria-label="Rating: ${numericValue.toFixed(1)} out of 5">
  <tr>
    ${cells.join('\n    ')}
    <td align="left" style="color:#0D0D0D;font-family:Arial,sans-serif;font-size:16px;line-height:24px;">${numericValue.toFixed(1)}</td>
  </tr>
</table>`
}

export function renderPreheaderLink({ label, href }) {
  const safeLabel = escapeHtml(requiredText(label, 'preheader.label'))
  const safeHref = escapeHtml(absoluteUrl(href, 'preheader.href'))
  return `<table ${tableAttributes('100%', 'align="center" class="wrap"')}>
  <tr>
    <td align="center" style="font-family:Arial,sans-serif;font-size:12px;line-height:16px;text-align:center;"><a href="${safeHref}" style="color:#014ECB;text-decoration:underline;">${safeLabel}</a></td>
  </tr>
</table>`
}

function renderMoniker(moniker) {
  const text = optionalText(moniker)
  if (!text) return ''
  return `<tr>
  <td align="center" style="padding-top:16px;">
    <table ${tableAttributes('auto', 'align="center"')} bgcolor="#E7F2FF" style="background-color:#E7F2FF;">
      <tr><td style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;line-height:16px;padding:3px 8px;text-transform:uppercase;">${escapeHtml(text)}</td></tr>
    </table>
  </td>
</tr>`
}

function renderTextLinks(links = [], fontSize = 16) {
  if (!Array.isArray(links)) throw new TypeError('post.links must be an array')
  return links.slice(0, 5).map(({ label, href }) => {
    const safeLabel = escapeHtml(requiredText(label, 'post.links[].label'))
    const safeHref = escapeHtml(absoluteUrl(href, 'post.links[].href'))
    return `<tr><td align="center" style="font-family:Arial,sans-serif;font-size:${fontSize}px;line-height:24px;padding-top:8px;text-align:center;"><a href="${safeHref}" style="color:#014ECB;text-decoration:underline;">${safeLabel}</a></td></tr>`
  }).join('\n')
}

export function renderPostContent({ post, layout = 'full-width' }) {
  const postLayout = oneOf(layout, ['full-width', 'two-column', 'three-column'], 'post.layout')
  const headline = escapeHtml(requiredText(post?.headline, 'post.headline'))
  const href = escapeHtml(absoluteUrl(post?.href, 'post.href'))
  const copy = optionalText(post?.copy)
  const sizes = {
    'full-width': { width: 604, headline: 28, lineHeight: 32, link: 18 },
    'two-column': { width: 314, headline: 20, lineHeight: 24, link: 16 },
    'three-column': { width: 201, headline: 16, lineHeight: 24, link: 14 },
  }[postLayout]
  const rating = post?.rating
    ? `<tr><td align="center" style="padding-top:8px;">${renderStarRating({
        ...post.rating,
        size: postLayout === 'three-column' ? 'compact' : 'standard',
      })}</td></tr>`
    : ''
  const cta = post?.cta
    ? `<tr><td align="center" style="padding-top:16px;">${renderButton(post.cta)}</td></tr>`
    : ''

  return `<table ${tableAttributes(sizes.width, 'align="center" class="wrap"')}>
  ${renderMoniker(post?.moniker)}
  <tr><td align="center" style="font-family:Georgia,serif;font-size:${sizes.headline}px;font-weight:700;line-height:${sizes.lineHeight}px;padding-top:${post?.moniker ? 8 : 0}px;text-align:center;"><a href="${href}" style="color:#0D0D0D;text-decoration:none;">${headline}</a></td></tr>
  ${rating}
  ${copy ? `<tr><td align="center" style="color:#0D0D0D;font-family:Arial,sans-serif;font-size:${postLayout === 'three-column' ? 14 : 16}px;line-height:${postLayout === 'three-column' ? 20 : 24}px;padding-top:8px;text-align:center;"><a href="${href}" style="color:#0D0D0D;text-decoration:none;">${escapeHtml(copy)}</a></td></tr>` : ''}
  ${renderTextLinks(post?.links, sizes.link)}
  ${cta}
</table>`
}

export function renderThreeLinkRow({ links }) {
  if (!Array.isArray(links) || links.length !== 3) {
    throw new TypeError('threeLinkRow.links must contain exactly three links')
  }
  const widths = [211, 228, 211]
  const columns = links.map((link, index) => {
    const label = escapeHtml(requiredText(link.label, `threeLinkRow.links[${index}].label`))
    const href = escapeHtml(absoluteUrl(link.href, `threeLinkRow.links[${index}].href`))
    const alignment = index === 0 ? 'left' : index === 2 ? 'right' : 'left'
    const border = index < 2 ? 'border-right:1px solid #D9D9D9;' : ''
    return `<table ${tableAttributes(widths[index], `align="${alignment}" class="wrap link-column"`)} style="${border}">
  <tr><td align="center" class="link-column-cell" style="font-family:Arial,sans-serif;font-size:16px;line-height:24px;padding:0 16px;text-align:center;"><a href="${href}" style="color:#014ECB;text-decoration:underline;">${label}</a></td></tr>
</table>`
  })

  return `<table ${tableAttributes(652, 'align="center" class="wrap"')} style="border-bottom:1px solid #D9D9D9;border-top:1px solid #D9D9D9;">
  <tr><td align="center" style="padding:24px 0;">
    ${columns[0]}
    <!--[if mso]></td><td><![endif]-->
    ${columns[1]}
    <!--[if mso]></td><td><![endif]-->
    ${columns[2]}
  </td></tr>
</table>`
}
