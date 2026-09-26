import { escapeHtml, optionalText } from './components/shared.js'

export function renderEmailDocument({ title = 'Reuben email', previewText, css, body }) {
  const preview = optionalText(previewText)
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
  <title>${escapeHtml(title)}</title>
  <style type="text/css">${css}</style>
</head>
<body class="body" style="margin:0;padding:0;width:100%;">
  ${preview ? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${escapeHtml(preview)}</div>` : ''}
  <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" class="full-wrap" style="width:100%;">
    <tr><td align="center">${body}</td></tr>
  </table>
</body>
</html>`
}
