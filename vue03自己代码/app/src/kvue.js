function defineReactive(obj, key, val) {
  //闭包 因为val和key都得给外界用 所以会保存下来
  let dep = new Dep() //每次碰到data属性 就创建一个dep
  //val 可能也是对象 所以也要递归去响应式
  observe(val) // obj{ baz: { a: 1 }}
  Object.defineProperty(obj, key, {
    get() {
      //console.log('get', val)
      //收集依赖watcher
      Dep.target && dep.addWatcher(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', newVal)
        observe(newVal) //新来的对象属性也要响应式 obj.baz = { b: 4 } 外国的去上党校
        //通知更新

        val = newVal
        dep.notify() //对应管家要求对应的watcher数组跟新
      }
    },
  })
}
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) return
  new Observer(obj)
}
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(newValue) {
        vm.$data[key] = newValue
      },
    })
  })
}

class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    proxy(this)
    observe(this.$data)
    new Compile('#app', this)
  }
}

class Observer {
  constructor(value) {
    this.value = value
    //判断value时Obj还是数组 这里只考虑Obj
    this.walk(value)
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key])
    })
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    //编译模板

    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    //递归遍历孩子 判断子节点类型 文本节点也要 不只是元素
    el.childNodes.forEach((node) => {
      if (this.isElement(node)) {
        console.log('元素', node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        console.log('插值', node.textContent)
        this.compileText(node)
      }
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }
  isElement(node) {
    return node.nodeType === 1
  }
  // {{xxx}} 形态 首先时文本 其次时 {{}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }
  compileElement(node) {
    //获取节点属性
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach((attr) => {
      let attrName = attr.name
      let exp = attr.value
      if (this.isDirective(attrName)) {
        let dir = attrName.substring(2)
        //指令函数
        this[dir] && this[dir](node, exp)
      } else if (this.isEvent(attrName)) {
        let dir = attrName.substring(1)
        //暗号："冬瓜冬瓜我是西瓜”
        let event = this.$vm.$options.methods[exp]
        console.log(dir, event)
        event && node.addEventListener(dir, event.bind(this.$vm))
      }
    })
  }
  isDirective(attrName) {
    return attrName.indexOf('k-') === 0
  }
  isEvent(attrName) {
    console.log(attrName)
    return attrName.indexOf('@') === 0
  }
  //真正更新
  textUpdater(node, value) {
    node.textContent = value
  }
  text(node, value) {
    this.update(node, value, 'text')
  }
  model(node, exp) {
    console.log(node.nodeName)
    if (node.nodeName !== 'INPUT') return
    node.addEventListener('input', (e) => {
      this.$vm[exp] = e.target.value
    })
    this.update(node, exp, 'model')
  }
  modelUpdater(node, value) {
    //console.log(node)
    node.value = value
  }
  //真正更新
  htmlUpdater(node, value) {
    node.innerHTML = value
  }
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  //exp动态表达式的值 dir表示指令值 所有动态绑定都需要去创建一个watcher
  //多这一层是为了创建watcher 去等待watcher的更新
  update(node, exp, dir) {
    //封装一层函数去创建watcher对象
    //初始化 就是最开始的时候渲染啥
    let fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    //等待watcher触发跟新去渲染 val是新修改的数据
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
}

//界面中的一个依赖(在文档中每个动态值就是一个依赖)对应一个watcher
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn
    //触发get事件 好把自己Push进去
    Dep.target = this
    this.vm[this.key] //触发get方法
    Dep.target = null
  }

  //dep调用触发watcher去跟新 this.vm[this.key])表示该Key的最新值
  update() {
    //console.log(this.key)
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  addWatcher(watcher) {
    this.deps.push(watcher)
  }
  notify() {
    this.deps.forEach((w) => {
      w.update()
    })
  }
}
