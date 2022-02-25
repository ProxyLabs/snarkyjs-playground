<template>
  <div class="wrapper">
    <MonacoEditor language="typescript" style="width: 100%; height: 100%" />
    <Button />
  </div>
</template>

<script lang="ts">
import MonacoEditor from '../MonacoEditor.vue'
import Button from './Button.vue'
export default {
  name: 'Learn',
  computed: {},
  components: { MonacoEditor, Button },
  data: () => {},
  methods: {},
}
</script>
<style scoped>
.wrapper {
  position: relative;
  width: 300px;
  height: 300px !important;
  border: solid 2px black;
}
</style>
