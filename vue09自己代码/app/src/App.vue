<template>
  <div id="app">
    <div id="nav">
      <svg-icon iconClass="wx"></svg-icon>
      <router-link to="/">Home</router-link>|
      <svg-icon iconClass="qq"></svg-icon>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
//导入素材 看到svg才有之前配置的Loader处理 name为wx 所以icon-wx即时可用的svg
//svg-icon是全局组件已经全局注册
console.log(process.env.foo) //得不到
console.log(process.env.VUE_APP_BANG)
export default {

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
