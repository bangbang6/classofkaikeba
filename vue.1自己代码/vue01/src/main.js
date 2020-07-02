import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() //实例挂载一个属性
new Vue({
  render: (h) => h(App),
}).$mount('#app')
