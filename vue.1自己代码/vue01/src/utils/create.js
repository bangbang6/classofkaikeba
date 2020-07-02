import Vue from 'vue'

export function create(component, props) {
  let conctor = Vue.extend(component)
  let comp = new conctor({ propsData: props }).$mount() //vue对象
  document.body.appendChild(comp.$el)
  console.log(comp)
  /*  let comp = new Vue({
    render(h) {
      return h(component, { props })
    },
  }).$mount() //vdom=》真实dom 存储在$el中 new Vue创建一个vdom render也创建一个vdom 所以 vue.children 和vue.$el都是一个component 
  //1.render (createElement: () => VNode) => VNode;newVue({}) h 和 2.new vue 和3.extend 第一个是传入描述虚拟节点的标签名 属性和子节点 后两个都是传一个.vue文件的模板 第一个返回vdom 第二个返回vue实例 第三个返回构造函数这是不同之处 vm要通过$mount()去挂载 vdom要在newVue/vue.extend的render里面变成实例
  //2,3差不多   1差别大 2，3里面用1
  console.log(comp) //vm相当于一个slot只有new vye会产生一个slot

  document.body.appendChild(comp.$el)

  let compChild = comp.$children[0]*/
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
}
