import {
  renderMedia,
  renderPostContent,
  renderThreeLinkRow,
} from './primitives.js'
import {
  absoluteUrl,
  escapeHtml,
  oneOf,
  optionalText,
  requiredText,
  tableAttributes,
} from './shared.js'

export function renderNlHeader({
  content = 'standard',
  backgroundColor = '#D9D9D9',
  logo,
  title,
  tagline,
  image,
}) {
  const headerContent = oneOf(content, ['standard', 'logo-only', 'image-only'], 'header.content')
  const safeBackground = /^#[0-9A-Fa-f]{6}$/.test(backgroundColor) ? backgroundColor : '#D9D9D9'

  if (headerContent === 'image-only') {
    const src = escapeHtml(absoluteUrl(image?.src, 'header.image.src'))
    const href = escapeHtml(absoluteUrl(image?.href, 'header.image.href'))
    const alt = escapeHtml(requiredText(image?.alt, 'header.image.alt'))
    return `<table ${tableAttributes(700, 'align="center" class="wrap"')} bgcolor="#FFFFFF" style="background-color:#FFFFFF;">
  <tr><td align="center"><a href="${href}"><img src="${src}" alt="${alt}" width="700" class="responsive-image" style="border:0;display:block;height:auto;max-width:700px;width:100%;" /></a></td></tr>
</table>`
  }

  const logoSrc = escapeHtml(absoluteUrl(logo?.src, 'header.logo.src'))
  const logoHref = escapeHtml(absoluteUrl(logo?.href, 'header.logo.href'))
  const logoAlt = escapeHtml(requiredText(logo?.alt, 'header.logo.alt'))
  const logoWidth = Number(logo?.width ?? 120)
  if (!Number.isFinite(logoWidth) || logoWidth < 40 || logoWidth > 340) {
    throw new TypeError('header.logo.width must be between 40 and 340')
  }

  const standardContent = headerContent === 'standard'
    ? `<table ${tableAttributes('auto', 'align="center"')}>
  <tr>
    <td align="right"><a href="${logoHref}"><img src="${logoSrc}" alt="${logoAlt}" width="${logoWidth}" style="border:0;display:block;height:auto;max-width:${logoWidth}px;" /></a></td>
    <td align="left" style="color:#0D0D0D;font-family:Georgia,serif;font-size:28px;font-weight:700;line-height:32px;padding-left:16px;">${escapeHtml(requiredText(title, 'header.title'))}</td>
  </tr>
</table>
${optionalText(tagline) ? `<table ${tableAttributes('auto', 'align="center"')}><tr><td align="center" style="color:#0D0D0D;font-family:Arial,sans-serif;font-size:14px;line-height:20px;padding-top:8px;text-align:center;">${escapeHtml(optionalText(tagline))}</td></tr></table>` : ''}`
    : `<table ${tableAttributes('auto', 'align="center"')}><tr><td align="center"><a href="${logoHref}"><img src="${logoSrc}" alt="${logoAlt}" width="${logoWidth}" style="border:0;display:block;height:auto;max-width:${logoWidth}px;" /></a></td></tr></table>`

  return `<table ${tableAttributes(700, 'align="center" class="wrap"')} bgcolor="${safeBackground}" style="background-color:${safeBackground};">
  <tr><td align="center" height="92" style="height:92px;padding:0 24px;vertical-align:middle;">${standardContent}</td></tr>
</table>`
}

export function renderOneColumnOnePost({ post }) {
  return `<table ${tableAttributes(652, 'align="center" class="wrap"')}>
  <tr><td align="center">
    ${renderMedia({ ...post.image, href: post.href, size: 'full' })}
    <table ${tableAttributes(652, 'align="center" class="wrap"')}><tr><td align="center" style="padding:16px 24px 24px;">
      ${renderPostContent({ post, layout: 'full-width' })}
    </td></tr></table>
  </td></tr>
</table>`
}

function renderSectionTitle(title) {
  const text = optionalText(title)
  if (!text) return ''
  return `<table ${tableAttributes(652, 'align="center" class="wrap"')}><tr><td align="center" style="color:#0D0D0D;font-family:Georgia,serif;font-size:28px;font-weight:700;line-height:32px;padding-bottom:24px;text-align:center;">${escapeHtml(text)}</td></tr></table>`
}

function renderPostCard(post, layout) {
  const width = layout === 'two-column' ? 314 : 201
  return `<table ${tableAttributes(width, 'align="center" class="wrap"')}>
  <tr><td align="center">
    ${renderMedia({ ...post.image, href: post.href, size: layout })}
    <table ${tableAttributes(width, 'align="center" class="wrap"')}><tr><td align="center" style="padding-top:16px;">
      ${renderPostContent({ post, layout })}
    </td></tr></table>
  </td></tr>
</table>`
}

export function renderTwoColumnTwoPost({ sectionTitle, posts, links }) {
  if (!Array.isArray(posts) || posts.length !== 2) {
    throw new TypeError('twoColumn.posts must contain exactly two posts')
  }
  const linkRow = links ? renderThreeLinkRow({ links }) : ''
  return `<table ${tableAttributes(652, 'align="center" class="wrap"')}>
  <tr><td align="center">
    ${renderSectionTitle(sectionTitle)}
    <table ${tableAttributes(652, 'align="center" class="wrap"')}>
      <tr><td align="center" valign="top">
        <table ${tableAttributes(314, 'align="left" class="wrap stack-column"')} style="float:left;"><tr><td align="center" class="mobile-column-gap">${renderPostCard(posts[0], 'two-column')}</td></tr></table>
        <!--[if mso]></td><td width="24"></td><td valign="top"><![endif]-->
        <table ${tableAttributes(314, 'align="right" class="wrap stack-column"')} style="float:right;"><tr><td align="center">${renderPostCard(posts[1], 'two-column')}</td></tr></table>
      </td></tr>
    </table>
    ${linkRow}
  </td></tr>
</table>`
}

export function renderThreeColumnThreePost({ sectionTitle, posts, links }) {
  if (!Array.isArray(posts) || posts.length !== 3) {
    throw new TypeError('threeColumn.posts must contain exactly three posts')
  }
  const columns = posts.map((post, index) => {
    const outerWidth = index < 2 ? 225 : 201
    const padding = index < 2 ? 'padding-right:24px;' : ''
    return `<table ${tableAttributes(outerWidth, `align="left" class="wrap stack-column"`)} style="float:left;">
  <tr><td align="center" class="three-column-cell" style="${padding}">${renderPostCard(post, 'three-column')}</td></tr>
</table>`
  })
  const linkRow = links ? renderThreeLinkRow({ links }) : ''

  return `<table ${tableAttributes(652, 'align="center" class="wrap"')}>
  <tr><td align="center">
    ${renderSectionTitle(sectionTitle)}
    <table ${tableAttributes(652, 'align="center" class="wrap"')}>
      <tr><td align="center" valign="top">
        ${columns[0]}
        <!--[if mso]></td><td><![endif]-->
        ${columns[1]}
        <!--[if mso]></td><td><![endif]-->
        ${columns[2]}
      </td></tr>
    </table>
    ${linkRow}
  </td></tr>
</table>`
}
