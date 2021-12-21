<template>
  <div class="wrapper">
    <MonacoEditor
      class="editor"
      v-model="code"
      language="typescript"
      theme="vs-dark"
    />
    <div class="console">
      <button class="execute-btn" @click="transpile()">EXECUTE</button>
      <div class="terminal">
        <span v-for="(msg, m) in consoleOutput" :key="m">
          <span style="color: red">>></span>
          <span style="color: black">{{ msg }}</span> <br />
        </span>
      </div>
    </div>
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

/*
    Interactive SnarkyJS Web Playground
    Made by Trivo

    ------

    Currently only dynamic import works
    the entire script will be executed locally inside your browser; no data leaves your computer
    very WIP!
*/

"use strict"

let { isReady, Field } = await import('/snarkyjs/index.js')

await isReady;

console.log("Hello SnarkyJS!");

let a = new Field(3);

console.log(a.mul(5).add(1).sub(a.mul(2)).toString());


      `,
      consoleOutput: [],
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
  created() {
    let current_log = console.log
    console.log = (msg) => {
      if (msg !== undefined) this.consoleOutput.push(msg)
      current_log.apply(null, arguments)
    }
  },
}
</script>

<style>
.wrapper {
  display: flex;
}

.editor {
  width: 50%;
  height: 500px;
}

.console {
  width: 50%;
}

.execute-btn {
  width: auto;
  height: auto;
  padding: 10px;
  color: black;
  font-weight: 600;
  font-size: 2rem;
  cursor: pointer;
}
</style>
