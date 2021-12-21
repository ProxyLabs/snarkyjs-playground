<template>
  <div class="editor">
    <MonacoEditor
      v-model="code"
      class="monaco"
      language="typescript"
      theme="vs-dark"
    />
    <div class="console">
      <span style="color: white">></span>
      <br />
      <span v-for="(output, o) in consoleOutput" :key="o">
        {{ output }}
        <br />
      </span>
    </div>
    <button @click="transpile()">TRANSPILE</button>
  </div>
</template>

<script type="module">
import MonacoEditor from 'vue-monaco'
import { transpile } from 'typescript'

console.oldLog = console.log
console.log = function (value) {
  console.oldLog(value)
  return value
}
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      code: `

      console.log('Hello everyone!');
      let a = new Field(3);
      console.log(a)
      `,
      consoleOutput: [],
    }
  },
  created() {
    let current_log = console.log

    console.log = (msg) => {
      if (msg !== undefined) this.consoleOutput.push(msg)
      current_log.apply(null, arguments)
    }
  },
  methods: {
    async transpile() {
      const js = transpile(this.code, {
        target: 'es6',
      })
      console.log(js)
      let pre = `

      async function load() {
        let { isReady, Field } = await import('/snarkyjs/web/index.js')

        await isReady;
        ${this.code}
      }
      load()
    `

      const res = await eval(pre)
      this.consoleOutput.push(`${res}`)
    },
  },
}
</script>

<style>
.editor {
  height: 50%;
  width: auto;
}

.monaco {
  width: 50%;
  height: 20vh !important;
}

.console {
  width: 50%;
  height: 20vh;
  background: #343a40;
  border-top: solid 2px #575d62;
}
</style>
