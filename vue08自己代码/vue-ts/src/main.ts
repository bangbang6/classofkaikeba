import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$http = axios

new Vue({
  render: (h) => h(App),
}).$mount('#app')

function validate(cb: Function) {
  return function(target: any, name: string, descriptor: any) {
    //target是类 name是函数名字 descriptor是这个函数变量的描述符
    console.log(descriptor.value)
    let fn = descriptor.value
    descriptor.value = function(username: string, password: string) {
      //扩展的简单校验逻辑
      let flag = false
      if (
        username.length >= 3 &&
        username.length <= 7 &&
        !/^\d+$/.test(password)
      ) {
        cb('用户名长度在3-7之间,且密码不全是数子')
        flag = true
      } else if (username.length >= 3 && username.length <= 7) {
        cb('密码全是数字')
      } else {
        cb('用户名长度不在3-7之间')
      }

      //原来的登录逻辑
      flag && fn(username, password)
    }
  }
}
//暗号:"you can you up"
class Student {
  constructor(public name: string, public password: string) {}
  @validate((error: string) => {
    document.querySelector('#app')!.textContent = error //在哪里显示错误信息由用户决定
  })
  login(username: string, password: string) {
    alert('登录成功')
  }
}
let s1 = new Student('yousa', 's43123456')
s1.login(s1.name, s1.password)
