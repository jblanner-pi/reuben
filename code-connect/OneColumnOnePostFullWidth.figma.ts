// url=https://www.figma.com/design/ypyq0Th1HES77IfxpXS2jq/Reuben---Email-Component-Library?node-id=61-69
// source=src/components/modules.js
// component=renderOneColumnOnePost
import figma from 'figma'

const instance = figma.selectedInstance
const viewport = instance.getEnum('Viewport', {
  Desktop: 'desktop',
  Mobile: 'mobile',
})

export default {
  example: figma.code`renderOneColumnOnePost({ post })`,
  imports: ['import { renderOneColumnOnePost } from "../src/components/modules.js"'],
  id: 'reuben-one-column-one-post-full-width',
  metadata: {
    nestable: false,
    props: {
      viewport,
      responsiveOutput: true,
      contentInput: 'post contains the Media and Post content data represented in Figma',
    },
  },
}
