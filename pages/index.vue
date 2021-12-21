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
<style scoped>
.wrapper {
  width: 100%;
  border: solid 2px red;
}
</style>
