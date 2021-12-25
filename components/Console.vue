<template>
  <div class="console">
    <div class="console-nav">
      <span style="margin-right: 15px">>_ Console</span>
      |
      <span style="margin-right: 15px; margin-left: 15px">
        <font-awesome-icon :icon="['fas', 'hashtag']" />
        {{ $props.output.length }}</span
      >
      |
      <span style="margin-left: 15px">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
        {{ $props.output.filter((x) => x.type == 'error').length }}</span
      >
    </div>
    <div class="terminal">
      <template v-for="(msg, m) in $props.output">
        <div :key="m">
          <div class="console-entry console-entry-log" v-if="msg.type == 'log'">
            <!-- <span class="icon is-left">
                <font-awesome-icon :icon="['fas', 'terminal']" />
              </span> -->
            <span>{{ msg.message }}</span> <br />
          </div>
          <div
            class="console-entry console-entry-error"
            v-if="msg.type == 'error'"
          >
            <span class="icon is-left">
              <font-awesome-icon :icon="['fas', 'times']" />
            </span>
            <span>{{ msg.message }}</span> <br />
          </div>
          <div
            class="console-entry console-entry-info"
            v-if="msg.type == 'info'"
          >
            <span class="icon is-left">
              <font-awesome-icon :icon="['fas', 'info']" />
            </span>
            <span>{{ msg.message }}</span> <br />
          </div>
          <div
            class="console-entry console-entry-warn"
            v-if="msg.type == 'warn'"
          >
            <span class="icon is-left">
              <font-awesome-icon :icon="['fas', 'bug']" />
            </span>
            <span>{{ msg.message }}</span> <br />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Console',
  props: ['output'],
}
</script>

<style scoped>
.console {
  width: auto;
  height: 170px;
  /* margin-right: 20px; */
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
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

.console-entry {
  font-family: 'Fira Mono', 'Courier New', Courier, monospace;
  border-bottom: 1px solid rgb(102, 102, 102);
  margin: 0;
  padding: 4px;
  padding-left: 10px;
  white-space: pre;
}

.console-entry-log {
  background-color: #17181a;
}

.console-entry-log span {
  color: #f5eea2;
}

.console-entry-info {
  background-color: #17181a;
}

.console-entry-info span {
  color: #2b8aff;
}

.console-entry-warn {
  background-color: #17181a;
}

.console-entry-warn span {
  color: #f69e83;
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
