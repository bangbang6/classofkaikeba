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
  }).$mount() //vdom=》真实dom 存储在$el中
 
  console.log(comp) //vm相当于一个slot只有new vye会产生一个slot

  document.body.appendChild(comp.$el)

  let compChild = comp.$children[0]*/
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
}
