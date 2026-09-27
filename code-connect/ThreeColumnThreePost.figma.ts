// url=https://www.figma.com/design/ypyq0Th1HES77IfxpXS2jq/Reuben---Email-Component-Library?node-id=75-387
// source=src/reuben-framework.js
// component=loadReubenModule
import figma from 'figma'

const instance = figma.selectedInstance
const sectionTitle = instance.getString('Section title')
const viewport = instance.getEnum('Viewport', {
  Desktop: 'desktop',
  Mobile: 'mobile',
})

export default {
  example: figma.code`await loadReubenModule("3col_3post")`,
  imports: ['import { loadReubenModule } from "../src/reuben-framework.js"'],
  id: 'reuben-three-column-three-post',
  metadata: {
    nestable: false,
    props: {
      viewport,
      sectionTitle,
      sourcePolicy: 'Returns the exact canonical fragment; its 24 px stars match the unified Figma standard.',
    },
  },
}
