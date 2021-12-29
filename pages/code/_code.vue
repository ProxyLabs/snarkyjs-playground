<template>
  <div class="wrapper">
    <ClientOnly>
      <Editor v-if="finishedLoading" :unparsedCode="code" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" type="module">
import Vue from 'vue'

export default Vue.extend({
  name: 'Playground',
  data() {
    return {
      code: ``,
      finishedLoading: false,
    }
  },
  async mounted() {
    let res = await fetch('http://127.0.0.1:3001/api/get/123')
    let parsed = await res.json()
    this.code = JSON.parse(parsed.code)
    this.finishedLoading = true
  },
})
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  /* height: 100%; */
  /* border: solid 2px red; */
}
</style>
