<template>
  <div class="wrapper">
    <ClientOnly>
      <Editor unparsedCode="" name="" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" type="module">
import Vue from 'vue'

export default Vue.extend({
  name: 'Playground',
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
