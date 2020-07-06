function defineReactive(obj, key, val) {
  //val 可能也是对象 所以也要递归去响应式
  observe(val) // obj{ baz: { a: 1 }}
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', val)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', newVal)
        observe(newVal) //新来的对象属性也要响应式 obj.baz = { b: 4 } 外国的去上党校
        val = newVal
      }
    },
  })
}
function observe(obj) {
  if (typeof obj !== 'object' || obj == null) return
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}
/* obj.dong = 'dong'
obj.dong */
function set(obj, key, val) {
  defineReactive(obj, key, val)
}
let obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }

observe(obj)
obj.foo
obj.foo = 'bang'

obj.baz.a = 2
obj.baz = { b: 4 }

obj.baz.b = 5
//新增属性 没有经过observe动态洗礼 所以得用$set

set(obj, 'dong', 'dong')

obj.dong = 'bang'
