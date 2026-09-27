// url=https://www.figma.com/design/ypyq0Th1HES77IfxpXS2jq/Reuben---Email-Component-Library?node-id=61-69
// source=src/reuben-framework.js
// component=loadReubenModule
import figma from 'figma'

const instance = figma.selectedInstance
const viewport = instance.getEnum('Viewport', {
  Desktop: 'desktop',
  Mobile: 'mobile',
})

export default {
  example: figma.code`await loadReubenModule("1col_1post_full-width")`,
  imports: ['import { loadReubenModule } from "../src/reuben-framework.js"'],
  id: 'reuben-one-column-one-post-full-width',
  metadata: {
    nestable: false,
    props: {
      viewport,
      sourcePolicy: 'Returns the exact body fragment from the canonical Reuben source snapshot.',
    },
  },
}
