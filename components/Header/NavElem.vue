<template>
  <div @click="handleClick()" class="nav fira">
    <span class="icon is-left">
      <font-awesome-icon :icon="['fas', $props.icon]" />
    </span>
    <span>{{ $props.label }}</span>
  </div>
</template>
<script>
export default {
  name: 'NavElem',
  props: ['label', 'icon'],
  methods: {
    handleClick() {
      this.$emit('clicked')
    },
  },
}
</script>

<style scoped>
.nav {
  /* border-bottom: solid 3px rgb(0, 166, 255); */
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  height: 100%;
  width: auto;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 15px;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.nav:hover {
  border-bottom: solid 3px rgb(0, 179, 255);
  transition: 0.3s;
}
.nav span {
  position: relative;
  top: 30%;
  font-size: 0.3 !important;
}
</style>
