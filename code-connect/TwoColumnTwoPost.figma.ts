// url=https://www.figma.com/design/ypyq0Th1HES77IfxpXS2jq/Reuben---Email-Component-Library?node-id=68-136
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
  example: figma.code`await loadReubenModule("2col_2post")`,
  imports: ['import { loadReubenModule } from "../src/reuben-framework.js"'],
  id: 'reuben-two-column-two-post',
  metadata: {
    nestable: false,
    props: {
      viewport,
      sectionTitle,
      sourcePolicy: 'Returns the exact body fragment from the canonical Reuben source snapshot.',
    },
  },
}
