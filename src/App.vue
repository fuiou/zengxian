<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view v-wechat-title="$route.meta.title"/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  padding:0;
  margin:0;
  width:100%;
  height:100%;
  background:#fff;
  font-family: 'Avenir','microsoft yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
