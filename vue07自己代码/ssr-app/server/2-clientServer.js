let express = require('express') //获取express 构造函数

let app = express() // 获取express 实例
app.get('/', (req, res) => {
  //send返回基本字符串 json返回json对象
  //spa
  //前端可能要激活 比如前端要创建vue实例加载后台传递的vue数据 因为后台时没有dom的 所以前端需要加上后台传过来的数据再加上dom操作 这就是激活
  let html = `
  <div id="app">
      <h1>{{title}}</h1>
      <p>{{content}}</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      new Vue({
        el:'#app',
        data:{
          title:'开课吧', 
          content:'开课吧真不错'
        }
      })
    </script>
  /
  `
  res.send(html)
})
app.listen(3000)
