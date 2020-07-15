let express = require('express')

let app = express()
let resolve = (dir) => require('path').resolve(__dirname, dir)

//静态服务
//开放dist/client目录 关闭index页面打开功能
app.use(express.static(resolve('../dist/client'), { index: false }))
//创造渲染器 createRenderer是个工厂函数 因为服务端不是单例 所以需要多个渲染函数
let { createBundleRenderer } = require('vue-server-renderer')
let bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
let renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: require('fs').readFileSync(
    resolve('../public/index.html'),
    'utf-8'
  ), // 宿主文件就是后台渲染模板 渲染页面入口文件 最后我们不用运行npm run serve去开前端页面所有就是没前端项目 前端页面是在index.html全部收集并在client-server里面激活 放在out-let这个注释里啦 后台加载这一个页面就行
  //后台server-bundle就是一个说明书 告诉页面怎么跳转怎么渲染 渲染要用的清单文件在clinet-server里面
  clientManifest: require(resolve(
    '../dist/client/vue-ssr-client-manifest.json'
  )), // 客户端bundle作用index.html需要的清单 这是前端打包的原因就是为了给后端提供清单包括前端激活文件(挂载) router文件等
  //搞清楚两个bUndle分别的作用 后台的vue实例时生成所有div#app里面的代码 前端的vue实例挂载时将vue实例挂载上去 虽然不是同一个实例 但是内容时一样的，所以无论是什么实例（多用户多实例） 前端都能挂载
})
//只做一件事就是渲染
app.get('*', async (req, res) => {
  //将vue实例渲染成字符串
  try {
    //router控制vue-router跳转 不加这句话 router不知道调转到哪个页面啦 因为这是后端 router-link在前端的(后台只是字符串) 控制跳转 后台的vue-router没拿到跳转的url
    let context = { url: req.url }
    let html = await renderer.renderToString(context)
    //console.log(html)

    res.send(html)
  } catch {
    res.status(500).send('error')
  }
})

app.listen(3000)
