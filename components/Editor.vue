<template>
  <div class="wrapper">
    <MonacoEditor
      class="editor"
      v-model="code"
      language="typescript"
      theme="vs-dark"
      :options="{
        automaticLayout: true,
      }"
    />

    <div class="console">
      <div class="controls">
        <button class="execute-btn" @click="transpile()">RUN</button>
        <button class="execute-btn" @click="clearConsole()">CLEAR</button>
      </div>
      <div class="terminal">
        <span v-for="(msg, m) in consoleOutput" :key="m">
          <span
            v-if="msg.type == 'error'"
            style="color: red; font-weight: 100; font-size: 10px"
            >[ERROR]</span
          >
          <span v-else style="color: grey; font-weight: 100; font-size: 10px"
            >[OUT]</span
          >
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

import { transpileModule } from 'typescript'

export default {
  components: {
    MonacoEditor,
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
      const compilerOptions = {
        allowJs: false,
        alwaysStrict: true,
        checkJs: true,
        strict: true,
        target: 'ESNext',
      }

      //getDefaultCompilerOptions()
      // console.log(compilerOptions)
      let { outputText } = transpileModule(this.code, { compilerOptions })
      //console.log(outputText)
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
    let current_error = console.error
    console.error = (msg) => {
      if (msg !== undefined) {
        this.consoleOutput.push({
          type: 'error',
          message: msg,
        })
      }
      current_error.apply(null, arguments)
    }
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

<style scoped>
.wrapper {
  /* display: flex; */
  height: 100%;
}

.editor {
  width: 100%;
  height: 60vh;
  margin-top: 5px;
  border-bottom: 2px solid rgb(54, 54, 54);
}

.console {
  width: 100%;
  height: 200px;
  margin-right: 20px;
  /* margin: 4px, 4px;
  padding: 4px;
  border-radius: 5px;
  width: 100%;
  color: white;
  border: solid 2px rgb(148, 148, 148);
  height: 110px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify; */
}

.terminal {
  margin: 4px, 4px;
  padding: 4px;
  border-radius: 5px;
  width: 100%;
  color: white;
  border: solid 2px rgb(148, 148, 148);
  height: 150px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
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
