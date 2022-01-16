import { createGlobalState, useDark } from '@vueuse/core'

export const useDarkGlobal = createGlobalState(() => useDark())

export const getDefaultCode = () => {
  return {
    value: {
      typescript: `
// This is some dummy code!
let someText: String = "Hello everyone :)";      
`,
    },
  }
}
