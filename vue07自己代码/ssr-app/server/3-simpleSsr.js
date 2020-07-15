let express = require('express')
let Vue = require('vue')
let Router = require('vue-router') //获取Router构造函数
Vue.use(Router)

let app = express()

//创造渲染器 createRenderer是个工厂函数 因为服务端不是单例 所以需要多个渲染函数
let { createRenderer } = require('vue-server-renderer')
let renderer = createRenderer()
//问题1：没办法交互 比如点击事件后台就是字符串 前端方法不执行
//问题2：路由有express接管 我们要vue-router
//问题3：同构开发
app.get('*', async (req, res) => {
  let router = new Router({
    routes: [
      { path: '/', component: { template: '<div>index</div>' } },
      { path: '/detail', component: { template: '<div>detail</div>' } },
    ],
  })

  //构造页面内容
  let vm = new Vue({
    router,
    data() {
      return {
        name: '北极星',
      }
    },
    template: `
    <div>
    <router-link to='/'>index</router-link>
    <router-link to='/detail'>detail</router-link>
    <div>{{name}}</div>
    <router-view></router-view>
    </div>
    
    `,
  })

  //将vue实例渲染成字符串
  try {
    //router控制vue-router跳转 不加这句话 router不知道调转到哪个页面啦 因为这是后端 router-link在前端的(后台只是字符串) 控制跳转 后台的vue-router没拿到跳转的url
    router.push(req.url)
    let html = await renderer.renderToString(vm)
    //console.log(html)

    res.send(html)
  } catch {
    res.status(500).send('error')
  }
})

app.listen(3000)
