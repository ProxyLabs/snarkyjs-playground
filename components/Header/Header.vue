<template>
  <div class="wrapper">
    <LogoSmall class="logo" />
    <!-- <div class="nav fira">
      <span class="icon is-left">
        <font-awesome-icon :icon="['fas', 'play']" />
      </span>
      <span>Run</span>
    </div> -->
    <slot></slot>
    <!-- <div class="nav fira">
      <span class="icon is-left">
        <font-awesome-icon :icon="['fas', 'link']" />
      </span>
      <span>Share</span>
    </div> -->
  </div>
</template>

<style scoped>
.wrapper {
  z-index: 5;
  height: 50px !important;
  width: 100%;
  background-color: #1d1f24;
  box-shadow: 0px 2px 2px #181818;
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
