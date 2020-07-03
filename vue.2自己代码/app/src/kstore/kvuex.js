let KVue

class Store {
  constructor(options) {
    this.$options = options

    //保存mutations
    this._mutations = options.mutations

    this._actions = options.actions

    //绑定this

    let store = this
    this.commit = this.commit.bind(store) //表示调用commit时候函数里面的this一定是store //解决啦这个commit里面的this可能不是store
    /*actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },*/

    let { action } = store
    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload)
    }
    this.getters = {}
    let computed = {} //私有vm实例的计算属性
    /* //将函数1变成一个计算出函数1结果的函数2
    export function partial(fn, arg) {
      return function() {
        return fn(arg)
      }
    } */
    //1.遍历用户传入的getters 暗号：‘天王盖地虎’
    Object.keys(this.$options.getters).forEach((key) => {
      let cb = this.$options.getters[key]
      //将computed对象构造出来 这样对this.getters取值时候就能在computed里面取值
      computed[key] = function() {
        return cb(store.state)
      }

      Object.defineProperty(this.getters, key, {
        enumerable: true,
        get: () => this._vm[key],
      })
    })
    console.log(computed)
    //响应式state
    this._vm = new KVue({
      data: {
        $$state: options.state,
      },
      computed,
    })
  }
  get state() {
    return this._vm._data.$$state
  }
  set state(val) {
    console.error('please use replaceState to reset state')
  }

  //commit 接受(type,payload) 向mutations提交 让mutation去修改state 对的是mutations
  commit(type, playload) {
    //根据Type获取mutations
    let entry = this._mutations[type]
    if (!entry) {
      console.error(`未知的mutation ${type}`)
      return
    }
    entry(this.state, playload)
  }

  //dispath 对的是actions actions里面函数是拿到commit方法继续去调用mutations

  dispatch(type, playload) {
    let entry = this._actions[type]
    if (!entry) {
      console.error(`未知的action ${type}`)
      return
    }
    return entry(this, playload)
  }
}
function install(Vue) {
  KVue = Vue
  Vue.mixin({
    beforeCreate() {
      //这里的this 不是store实例 而是组件 这是混入组件中
      if (this.$options.store) {
        //store挂载
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}
export default { Store, install }
