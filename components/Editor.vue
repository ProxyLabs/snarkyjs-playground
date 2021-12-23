<template>
  <div class="wrapper">
    <Header>
      <NavElem label="Run" icon="play" v-on:clicked="transpile()" />
      <NavElem label="Clear" icon="trash" v-on:clicked="clearConsole()" />
      <NavElem label="Share" icon="link" />
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

    <div class="console">
      <div class="console-nav">
        <span style="margin-right: 15px">>_ Console</span>
        |
        <span style="margin-right: 15px; margin-left: 15px">
          <font-awesome-icon :icon="['fas', 'hashtag']" />
          {{ consoleOutput.length }}</span
        >
        |
        <span style="margin-left: 15px">
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
          {{ consoleOutput.filter((x) => x.type == 'error').length }}</span
        >
      </div>
      <div class="terminal">
        <template v-for="(msg, m) in consoleOutput">
          <div
            class="console-entry"
            :class="
              msg.type == 'error' ? 'console-entry-error' : 'console-entry-info'
            "
            :key="m"
          >
            <span>{{ msg.message }}</span> <br />
          </div>
        </template>
      </div>
      <div class="cursor">
        <span style="color: white; font-size: 1.3rem; weight: 300"
          >><span class="cursor">_</span></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import Header from './Header/Header.vue'
import NavElem from './Header/NavElem.vue'
import { transpileModule } from 'typescript'

export default {
  components: {
    MonacoEditor,
    NavElem,
    Header,
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
    scrollConsole() {
      let div = document.querySelector('div.terminal')
      let divCurrentUserScrollPosition = div.scrollTop + div.offsetHeight
      let divScrollHeight = div.scrollHeight

      div.addEventListener('DOMSubtreeModified', () => {
        if (divScrollHeight === divCurrentUserScrollPosition) {
          // Scroll to bottom of div
          div.scrollTo({ left: 0, top: div.scrollHeight })
        }
      })
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
      // this.scrollConsole()
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
  mounted() {},
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
  background-color: #1f2227 !important;
}

.console {
  width: 100%;
  height: 170px;
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
.terminal {
  /* margin: 4px, 4px;
  padding: 4px; */
  width: auto;
  color: white;
  /* border: solid 2px rgb(148, 148, 148); */
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: justify;
  border-bottom: 1px solid grey;
}

.console-nav {
  color: grey;
  padding: 5px;
  background-color: #222427;
  border-bottom: 3px solid #444549;
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

.console-entry {
  font-family: 'Fira Mono', 'Courier New', Courier, monospace;
  border-bottom: 1px solid rgb(102, 102, 102);
  margin: 0;
  padding: 4px;
  padding-left: 10px;
}

.console-entry-info {
  background-color: #17181a;
}

.console-entry-info span {
  color: #f5eea2;
}

.console-entry-error {
  background-color: #994332;
  border-left: 4px solid rgb(199, 0, 0);
}

.console-entry-error span {
  color: #ffffff;
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
