<template>
  <div class="wrapper fira">
    <input type="text" v-model="projectName" />
    <!-- <span class="icon is-right">
      <font-awesome-icon :icon="['fas', 'pen']" />
    </span> -->
  </div>
</template>
<script>
export default {
  name: 'name',
  props: ['name'],
  data() {
    return {
      projectName: 'sample-project-name',
    }
  },
  methods: {
    getName() {
      return this.projectName
    },
  },
  created() {
    if (this.$props.name != '' || this.$props.name != null) {
      this.projectName = this.$props.name
    }
  },
}
</script>

<style scoped>
.wrapper {
  /* border-bottom: solid 3px rgb(0, 166, 255); */
  border-bottom-left-radius: 1px;
  border-bottom-right-radius: 1px;
  height: 100%;
  width: auto;
  padding-left: 10px;
  padding-right: 10px;
  /* margin-left: 15px; */
  text-align: center;
  transition: 0.2s;
  border: none !important;
  box-shadow: none !important;
  margin-left: 20px;
}

.wrapper input {
  margin-top: 5px;
  margin-bottom: 5px;
  color: #7c7f81;
  background-color: rgba(68, 0, 0, 0);
  font-size: 100%;
  border: 1px solid #25272a;
  outline-style: solid;
  outline-color: #25272a;
  outline-width: thin;
  border-radius: 3px;
}

.wrapper input:focus,
.wrapper input:focus {
  outline: rgb(77, 77, 77);
}
/* .nav:hover {
  border-bottom: solid 3px rgb(0, 179, 255);
  background-color: #26282e;
  transition: 0.3s;
}
.nav span {
  position: relative;
  top: 30%;
  font-size: 0.3 !important;
} */
</style>
