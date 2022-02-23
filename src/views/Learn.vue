<template>
  <div class="wrapper">
    <div class="left">
      <router-view></router-view>
    </div>

    <div class="right">
      <h1>Chapters</h1>

      <hr />
      <template v-for="(nav, i) in navigation.guides['learning-mina']">
        <router-link :to="nav.path">
          <h3 class="link">
            {{ `${i + 1}. - ${nav.title}` }}
          </h3>
        </router-link>

        <template
          v-if="nav.child_elements.length !== 0"
          v-for="(child, c) in nav.child_elements"
        >
        <router-link :to="child.path">
          <h3 class="link" style="margin-left: 15px">
            {{ `${i + 1}.${c + 1} - ${child.title}` }}
          </h3>
        </router-link>
     
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import navigationJson from '../markdown/navigation.json'
export default {
  name: 'Learn',
  computed: {},
  components: {},
  data: () => {
    return {
      navigation: navigationJson,
    }
  },
  methods: {},
}
</script>
<style scoped>

.link {
  margin-top: 5px;
  margin-left: 5px;
}
.left {
  margin-top: 30px;
  width: 80%;
}

.right {
  margin-top: 30px;
  width: 20%;
  border-width: 1px;
  border-right: 0px;
  border-top: 0px;
  border-bottom: 0px;
}
.right h1 {
  font-size: 1.8rem;
  text-align: center;
}

hr {
  margin-left: 8%;
  margin-right: 8%;
}

.wrapper {
  display: flex;
  width: auto;
  height: 100vh;
  border-width: 1px;
  margin-left: 13%;
  margin-right: 13%;
}
</style>
