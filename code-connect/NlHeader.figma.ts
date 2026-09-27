// url=https://www.figma.com/design/ypyq0Th1HES77IfxpXS2jq/Reuben---Email-Component-Library?node-id=57-10
// source=src/reuben-framework.js
// component=resolveFigmaModule
import figma from 'figma'

const instance = figma.selectedInstance
const content = instance.getEnum('Content', {
  Standard: 'Standard',
  'Logo-only': 'Logo-only',
  'Image-only': 'Image-only',
})
const viewport = instance.getEnum('Viewport', {
  Desktop: 'desktop',
  Mobile: 'mobile',
})
const title = instance.getString('Header title')
const tagline = instance.getString('Tagline')

export default {
  example: figma.code`await resolveFigmaModule("nl-header", "${content}")`,
  imports: ['import { resolveFigmaModule } from "../src/reuben-framework.js"'],
  id: 'reuben-nl-header',
  metadata: {
    nestable: false,
    props: {
      viewport,
      title,
      tagline,
      sourcePolicy: 'Resolve the canonical Reuben source before authoring. Unsupported design-only variants are returned as explicit gaps.',
    },
  },
}
