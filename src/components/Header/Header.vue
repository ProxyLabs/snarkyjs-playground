<template>
  <div class="wrapper">
    <LogoSmall class="logo" />
    <h1 class="label">SnarkyJS Playground</h1>
    <!-- <div class="nav fira">
      <span class="icon is-left">
        <font-awesome-icon :icon="['fas', 'play']" />
      </span>
      <span>Run</span>
    </div> -->
    <slot></slot>
    <div class="right">
      <iframe
        src="https://ghbtns.com/github-btn.html?user=ProxyLabs&repo=snarkyjs-playground&type=star&count=true&size=large"
        frameborder="0"
        scrolling="0"
        width="170"
        height="60"
        title="GitHub"
      ></iframe>
    </div>
  </div>
  <div class="sub-nav"></div>
</template>

<script setup lang="ts">
import LogoSmall from '../LogoSmall.vue'
</script>

<style scoped>
.sub-nav {
  height: 20px;
  border-width: 1px;
  background-color: rgb(62, 157, 221);
  padding: 0;
  margin: 0;
  line-height: 20px;
}
.right {
  position: relative;
  justify-content: right;
  left: 10px;
  margin-left: auto;
  margin-right: 10px;
  line-height: 60px;
  margin-top: 10px;
}

.label {
  line-height: 60px;
  font-size: 1.4rem;
  font-weight: 400;
  margin-right: 20px;
}
.wrapper {
  z-index: 5;
  height: 60px !important;
  width: auto;
  margin-left: 15%;
  margin-right: 15%;

  /* border: solid 2px black; */
  background-color: #ffffff;
  display: flex;
  /* justify-content: space-between; */
}

.logo {
  padding: 10px;
  margin-left: 15px;
}

.content {
  align-self: left;
  width: 200px;
}
</style>
