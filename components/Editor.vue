<template>
  <div class="wrapper">
    <!-- <MonacoEditor
      class="editor"
      v-model="code"
      language="typescript"
      theme="vs-dark"
      :options="{
        automaticLayout: true,
      }"
    /> -->
    <button class="execute-btn" @click="transpile()">EXECUTE</button>

    <button class="execute-btn" @click="clearConsole()">CLEAR</button>

    <div class="console">
      <div class="terminal">
        <span v-for="(msg, m) in consoleOutput" :key="m">
          <span v-if="msg.type == 'error'" style="color: red; font-weight: 100"
            >[ERROR]</span
          >
          <span v-else style="color: grey; font-weight: 100">[OUT]</span>
          <span style="color: white">{{ msg.message }}</span> <br />
        </span>
        <span style="color: white; font-size: 1.3rem; weight: 300"
          >><span class="cursor">_</span></span
        >
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
    the entire script will be executed locally inside your browser;
    no data leaves your computer
    very WIP!
*/

"use strict"

let { isReady, Field } = await import('/snarkyjs/index.js')

await isReady;

console.log("Hello SnarkyJS!");

let a = new Field(3);

console.log(a.mul(5).add(1).sub(a.mul(2)).toString());

throw "error";

      `,
      consoleOutput: [],
    }
  },
  methods: {
    clearConsole() {
      this.consoleOutput = []
    },
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
        await eval(pre)
        //await new Function(pre)()
      } catch (e) {
        // console.log(e)
        this.consoleOutput.push({
          type: 'error',
          message: e,
        })
      }
    },
  },
  created() {
    let current_log = console.log
    console.log = (msg) => {
      if (msg !== undefined) {
        this.consoleOutput.push({
          type: 'info',
          message: msg,
        })
      }
      current_log.apply(null, arguments)
    }
  },
}
</script>

<style>
.wrapper {
  display: flex;
  height: 100vh;
}

.editor {
  width: 50%;
}

.console {
  margin: 4px, 4px;
  padding: 4px;
  border-radius: 5px;
  width: 100%;
  color: white;
  border: solid 2px red;
  height: 110px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
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

.cursor {
  -webkit-animation: blink 1s 11.5s infinite;
  -moz-animation: blink 1s 8.5s infinite;
  -o-animation: blink 1s 8.5s infinite;
  animation: blink 1s 8.5s infinite;
}

@-webkit-keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
