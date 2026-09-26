export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function requiredText(value, name) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new TypeError(`${name} must be a non-empty string`)
  }
  return value.trim()
}

export function absoluteUrl(value, name) {
  const text = requiredText(value, name)
  let url
  try {
    url = new URL(text)
  } catch {
    throw new TypeError(`${name} must be an absolute URL`)
  }
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new TypeError(`${name} must use http or https`)
  }
  return url.href
}

export function oneOf(value, values, name) {
  if (!values.includes(value)) {
    throw new TypeError(`${name} must be one of: ${values.join(', ')}`)
  }
  return value
}

export function optionalText(value) {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null
}

export function tableAttributes(width, extra = '') {
  const widthAttribute = width === 'auto' ? '' : `width="${width}"`
  return `role="presentation" border="0" cellspacing="0" cellpadding="0" ${widthAttribute} ${extra}`.replace(/\s+/g, ' ').trim()
}
