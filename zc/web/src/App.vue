<template>
  <div class="container">
    <!-- <scan></scan> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Scan from "./components/Scan.vue";

export default {
  name: "app",
  components: {
    Scan
  },
  creater() {}
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.container {
  height: 100%;
  background-image: url("../src/assets/timg.jpeg");
  background-size: auto 100%;
  background: cover;
  /* background-repeat: no-repeat; */
}
.el-input__inner {
  font-size: 16px !important;
}
</style>
