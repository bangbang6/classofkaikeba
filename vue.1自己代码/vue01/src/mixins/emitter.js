//广播 从上到下派发事件

function broadcast(componentName, eventName, params) {
  //遍历所有的子元素 且一定有关name属性
  this.$children.forEach((child) => {
    var name = child.$options.componentName
    //如果两个name相同
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      //这层没有继续向下层遍历
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    //冒泡从下到上查找componetname一样的名字派发
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.componentName
      //向上找直到找到名字一样
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        //给他派发事件
        if (parent) {
          name = parent.$options.componentName
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
  },
}
