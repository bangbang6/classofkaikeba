//srver打包文件
//将来和渲染器打交道 这是处理首屏加载

import { createApp } from './main'

//1.创建vue实例 context 是渲染器和vuesrr打包文件的交互对象
export default (context) => {
  let { app, router, store } = createApp(context)
  return new Promise((reslove, reject) => {
    //跳转到首屏
    router.push(context.url)

    router.onReady(() => {
      let comps = router.getMatchedComponents(context.url)
      let res = comps.map((comp) => {
        if (comp.asyncData) {
          return comp.asyncData({ store, route: router.currentRoute })
        }
      })
      //后台处理啦store但是前端没出里所以需要同步到前端 因为这部分代码是写在后台的所以需要同步
      Promise.all(res)
        .then(() => {
          //未来renderer把他转换成字符串传给前端在还原
          context.state = store.state
          reslove(app)
        })
        .catch(reject)
    }, reject)
  })
}
