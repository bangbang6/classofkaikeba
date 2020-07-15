import Vue from 'vue'
import Router from 'vue-router' //拿到构造函数
import Home from './views/Home.vue'

Vue.use(Router)

// 工厂函数，每次请求返回一个Router实例  这是和之前router唯一的不同
export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ './views/About.vue'),
      },
    ],
  })
}
