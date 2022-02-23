<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <Header>
    <router-link to="/Learn">
      <NavElem label="Learn" />
    </router-link>
    <router-link to="/">
      <NavElem label="Official Docs" />
    </router-link>
    <a target="_blank" href="https://www.google.com/">
      <NavElem label="Official GitHub" />
    </a>
  </Header>
  <router-view />
</template>

<script setup lang="ts">
import Header from './components/Header/Header.vue'
import NavElem from './components/Header/NavElem.vue'
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
