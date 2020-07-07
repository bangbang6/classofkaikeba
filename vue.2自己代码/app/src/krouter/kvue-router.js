//插件
let KVue
class KVueRouter {
  constructor(options) {
    this.$options = options
    let inital = window.location.hash.slice(1) || '/'
    KVue.util.defineReactive(this, 'current', inital)
    KVue.util.defineReactive(this, 'matched', [])
    //match函数可以递归遍历路由表 获取匹配的数组
    this.match()
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
    this.matched = []
    this.match()
    //console.log(this.current)
  }
  match(routes) {
    routes = routes ? routes : this.$options.routes
    //遍历routes
    for (let route of routes) {
      //这个是首页 不需要递归children因为肯定有孩子 在第二个if去判断
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      console.log(this.current, route.path)
      //不是/ 且找得到path 比如‘about/info’
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        console.log(route)
        if (route.children) {
          this.match(route.children)
        }
      }
    }
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
  //1.做router-view深度标记 路径匹配一系列数组 再根据depth来获取组件
  Vue.component('router-view', {
    render(h) {
      //获取路由表
      /* let routes = this.$router.$options.routes

      let current = this.$router.current
      let route = routes.find((route) => route.path == current)
      let comp = route ? route.component : null */

      this.$vnode.data.routerView = true
      let depth = 0
      let parent = this.$parent
      while (parent) {
        let vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData) {
          if (vnodeData.routerView) {
            //说明parent是一个routerview
            depth++
          }
        }
        parent = parent.$parent
      }
      let comp = null
      //从数组的depth取出 depth可以计算当前的组件的深度
      //console.log('depth', depth)
      let route = this.$router.matched[depth]
      if (route) {
        comp = route.component
      }
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
