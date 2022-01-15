<template>
  <main class="border-t border-gray-200 dark:border-gray-700">
    <div class="flex flex-row h-full">
      <div class="w-full">
        <MonacoEditor language="typescript" />
      </div>
    </div>
  </main>
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
