<template>
  <div>
    <MonacoEditor
      class="editor"
      v-model="code"
      language="typescript"
      theme="vs-dark"
    />
    <button @click="transpile()">EXECUTE</button>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'

import { transpile } from 'typescript'

export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code: `

let { isReady, Field } = await import('/snarkyjs/web')

console.log("Hello SnarkyJS!");




      `,
    }
  },
  methods: {
    async transpile() {
      try {
        const js = transpile(this.code, {
          target: 'es6',
        })
        let pre = `
        async function load() {
          ${js}
        }
        load();
        `
        await new Function(pre)()
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style>
.editor {
  width: 50%;
  height: 800px;
}
</style>
