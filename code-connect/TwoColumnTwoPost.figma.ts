// url=https://www.figma.com/design/ypyq0Th1HES77IfxpXS2jq/Reuben---Email-Component-Library?node-id=68-136
// source=src/components/modules.js
// component=renderTwoColumnTwoPost
import figma from 'figma'

const instance = figma.selectedInstance
const sectionTitle = instance.getString('Section title')
const viewport = instance.getEnum('Viewport', {
  Desktop: 'desktop',
  Mobile: 'mobile',
})

export default {
  example: figma.code`renderTwoColumnTwoPost({
  sectionTitle: "${sectionTitle}",
  posts,
  links,
})`,
  imports: ['import { renderTwoColumnTwoPost } from "../src/components/modules.js"'],
  id: 'reuben-two-column-two-post',
  metadata: {
    nestable: false,
    props: {
      viewport,
      responsiveOutput: true,
      contentInput: 'posts and links contain the repeated nested instance data represented in Figma',
    },
  },
}
