<template>
  <div class="w-full h-full">
    <MonacoEditor language="typescript" />
  </div>
</template>

<script lang="ts">
import MonacoEditor from '../components/MonacoEditor.vue'

export default {
  name: 'Home',
  components: {
    MonacoEditor,
  },
}
</script>
<style scoped>
main {
  height: calc(100vh - var(--nav-height));
}
</style>
