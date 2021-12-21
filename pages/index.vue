<template>
  <div class="wrapper">
    <ClientOnly>
      <Editor />
    </ClientOnly>
  </div>
</template>

<script lang="ts" type="module">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
<style>
body {
  padding: 0;
  margin: 0;
  background-color: #1e1e1e;
  overflow: hidden;
}
.wrapper {
  width: 100%;
  /* height: 100%; */
  /* border: solid 2px red; */
}
</style>
