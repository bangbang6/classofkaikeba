//插件
let KVue
class KVueRouter {
  constructor(options) {
    this.$options = options
    let inital = window.location.hash.slice(1) || '/'
    KVue.util.defineReactive(this, 'current', inital)

    //监听hashchange事件
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    //window.addEventListener('load', this.onHashChange.bind(this))

    //缓存
    this.routerMap = {}
    this.$options.routes.forEach((route) => {
      this.routerMap[route.path] = route
    })
  }
  onHashChange() {
    //# 后面的部分
    this.current = window.location.hash.slice(1)
    console.log(this.current)
  }
}
KVueRouter.install = function(Vue) {
  KVue = Vue
  //1.挂载$router
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    },
  })
  //2.实现两个全局组件
  Vue.component('router-view', {
    render(h) {
      //获取路由表
      /* let routes = this.$router.$options.routes

      let current = this.$router.current
      let route = routes.find((route) => route.path == current)
      let comp = route ? route.component : null */
      let comp = this.$router.routerMap[this.$router.current]
        ? this.$router.routerMap[this.$router.current].component
        : null
      return h(comp)
    },
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      //this.$slots 获取该组件的所有插槽

      return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
    },
  })
}
export default KVueRouter
