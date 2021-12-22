<template>
  <div class="wrapper">
    <Header />
    <div class="content">
      <div class="card">
        <h1 class="fira">Playground</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts" type="module">
import Vue from 'vue'
import Header from '~/components/Header/Header.vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.card {
  padding: 10px 25px;
  width: auto;
  height: auto;
  border: solid 1px rgb(90, 90, 90);
  align-content: center;
  text-align: center;
  border-radius: 5px;
}
</style>
