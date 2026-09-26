// url=https://www.figma.com/design/ypyq0Th1HES77IfxpXS2jq/Reuben---Email-Component-Library?node-id=57-10
// source=src/components/modules.js
// component=renderNlHeader
import figma from 'figma'

const instance = figma.selectedInstance
const content = instance.getEnum('Content', {
  Standard: 'standard',
  'Logo-only': 'logo-only',
  'Image-only': 'image-only',
})
const viewport = instance.getEnum('Viewport', {
  Desktop: 'desktop',
  Mobile: 'mobile',
})
const title = instance.getString('Header title')
const tagline = instance.getString('Tagline')

export default {
  example: figma.code`renderNlHeader({
  content: "${content}",
  ${content === 'standard' ? figma.code`title: "${title}",
  tagline: "${tagline}",
  logo,` : ''}
  ${content === 'logo-only' ? figma.code`logo,` : ''}
  ${content === 'image-only' ? figma.code`image: headerImage,` : ''}
})`,
  imports: ['import { renderNlHeader } from "../src/components/modules.js"'],
  id: 'reuben-nl-header',
  metadata: {
    nestable: false,
    props: {
      viewport,
      responsiveOutput: true,
      assetInputs: 'logo and headerImage are supplied by the email build',
    },
  },
}
