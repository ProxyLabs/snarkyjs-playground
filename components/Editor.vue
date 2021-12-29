<template>
  <div class="wrapper">
    <Header>
      <NavElem label="Run" icon="play" v-on:clicked="transpile()" />
      <NavElem label="Clear" icon="trash" v-on:clicked="clearConsole()" />
      <NavElem label="Share" icon="link" />
      <ProjectName />
    </Header>

    <MonacoEditor
      class="editor"
      v-model="code"
      language="typescript"
      theme="vs-dark"
      :options="{
        automaticLayout: true,
      }"
    />
    <Console :output="consoleOutput" />
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import Header from './Header/Header.vue'
import NavElem from './Header/NavElem.vue'
import ProjectName from './Header/ProjectName.vue'

import Console from './Console.vue'

import { transpileModule } from 'typescript'

export default {
  components: {
    MonacoEditor,
    NavElem,
    Header,
    Console,
    ProjectName,
  },
  data() {
    return {
      code: `/*
    Currently only dynamic import works
    the entire script will be executed locally inside your browser;
    no data leaves your computer
    very WIP - **DO NOT** use for anything important
    expect **MANY** bugs and weirds features ;)
*/

let { isReady, Field } = await import('/snarkyjs/index.js')

await isReady;

console.log("Hello SnarkyJS!");

let a = new Field(3);

console.log(a.mul(5).add(1).sub(a.mul(2)).toString());

let b = Field(3).mul(Field(2));

console.log(b.toString());
throw "throwing an error right here";`,
      consoleOutput: [],
    }
  },
  methods: {
    clearConsole() {
      this.consoleOutput = []
    },
    async transpile() {
      this.consoleOutput.push({
        type: 'info',
        message: 'Executing code snippet..',
      })
      const compilerOptions = {
        allowJs: false,
        alwaysStrict: true,
        checkJs: true,
        strict: true,
        target: 'ES6',
      }

      let { outputText } = transpileModule(this.code, { compilerOptions })

      let pre = `
          async function load() {
            try {
              ${outputText}
            } catch(e) {
              console.error(e)
            }
          }
          load();
        `
      try {
        let func = new Function(pre)
        func()
      } catch (runtimeError) {
        console.log('------')
        console.error('legal code; unforeseen result: ', runtimeError)
        console.info(runtimeError.name, '-', runtimeError.message)
        console.log('------')
        // console.log(e)
        this.consoleOutput.push({
          type: 'error',
          message: runtimeError,
        })
      }
    },
  },
  async created() {
    let current_log = console.log
    console.log = (msg) => {
      this.consoleOutput.push({
        type: 'log',
        message: msg,
      })
      current_log.apply(null, arguments)
      current_log(msg)
    }

    let current_warn = console.warn
    console.warn = (msg) => {
      this.consoleOutput.push({
        type: 'warn',
        message: msg,
      })
      current_warn.apply(null, arguments)
      current_warn(msg)
    }

    let current_info = console.info
    console.info = (msg) => {
      this.consoleOutput.push({
        type: 'info',
        message: msg,
      })
      current_info.apply(null, arguments)
      current_info(msg)
    }

    let current_error = console.error
    console.error = (msg) => {
      this.consoleOutput.push({
        type: 'error',
        message: msg,
      })
      current_error.apply(null, arguments)
      current_error(msg)
    }
  },
  mounted() {
    console.info("Welcome! Time to get Snarky'n ;)")
    console.info(
      'First execution might take up to 5 seconds for SnarkyJS to load in..'
    )
  },
}
</script>

<style scoped>
.wrapper {
  height: 100%;
}

.editor {
  width: 100%;
  height: 60vh;
  margin-top: 5px;
  border-bottom: 2px solid rgb(54, 54, 54);
  background-color: #1f2227 !important;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #3b3b3b;
}

::-webkit-scrollbar-thumb {
  background: #686868;
}

::-webkit-scrollbar-thumb:hover {
  background: #686868;
}

.execute-btn {
  width: auto;
  height: auto;
  padding: 5px;
  color: black;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  margin-bottom: 5px;
  margin-top: 15px;
  margin-left: 5px;
  background-color: rgb(213, 213, 251);
  cursor: pointer;
}
</style>
