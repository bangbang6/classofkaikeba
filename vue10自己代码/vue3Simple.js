let isObj = (v) => v !== null && typeof v === 'object'
function reactive(obj) {
  if (!isObj(obj)) return
  return new Proxy(obj, {
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver)
      track(target, key)
      console.log('获取', key)
      return isObj(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      let res = Reflect.set(target, key, value, receiver)
      console.log('set', key)
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      let res = Reflect.deleteProperty(target, key)
      console.log('delete', key)
      trigger(target, key)
      return res
    },
  })
}
//响应式函数 放入effectStack
let effectStack = []
function effect(fn) {
  let rxEffect = function () {
    try {
      effectStack.push(rxEffect)
      return fn()
    } finally {
      effectStack.pop()
    }
  }

  rxEffect(fn)
  return rxEffect
}
//key 和cb 放到map中
let weekMap = new WeakMap()
function track(target, key) {
  let effect = effectStack[effectStack.length - 1]
  if (effect) {
    let map = weekMap.get(target)
    if (!map) {
      map = new Map()
      weekMap.set(target, map)
    }

    let cbs = map.get(key)
    if (!cbs) {
      cbs = new Set()
      map.set(key, cbs)
    }
    cbs.add(effect)
  }
}

//set中触发map中对应的cbs
function trigger(target, key) {
  let map = weekMap.get(target)
  if (map) {
    let cbs = map.get(key)
    if (cbs) {
      cbs.forEach((cb) => {
        cb()
      })
    }
  }
}
let data = reactive({ foo: 'foo', arr: [1, 2, 3] })
//data.foo
//data.foo = 'fooooo'
//delete data.foo
