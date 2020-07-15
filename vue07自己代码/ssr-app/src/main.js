import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false

Vue.mixin({
  beforeMount() {
    //可能前端也要调用asyncData 不是只有服务端首页在服务端判断asyncData来执行 而是所有组件只要有asyncData就能执行
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      })
    }
  },
})

//返回vue实例的工厂函数 为什么不挂载因为服务器不需要挂载 前端激活的时候在挂载
//这个函数寄给服务器又给客户端用
//context是用于和后端 renderder交互传context进来就行一些配置
export function createApp(context) {
  //跟组件引入router实例
  let router = createRouter()
  let store = createStore()
  let app = new Vue({
    router,
    store,
    context,
    render: (h) => h(App),
  })
  return { app, router, store }
}
