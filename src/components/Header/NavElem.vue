<template>
  <div class="nav">
    <span>{{ $props.label }}</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'NavElem',
  props: ['label'],
  methods: {},
}
</script>

<style scoped>
.nav {
  color: rgb(0, 0, 0);
  text-align: center;
  line-height: 60px;
  margin-left: 30px;
  font-size: 1.1rem;
  cursor: pointer;
}

.nav:hover {
  color: rgb(175, 175, 175);
}
</style>
