import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 1,
    center: 1,
  },
  mutations: {
    add(state) {
      state.counter++
    },
    mutil(state) {
      state.center = state.center * 2
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000)
    },
  },
  modules: {},
  getters: {
    doubleCounter: (state) => {
      return state.counter * 2
    },
    centerPlus: (state) => {
      return state.center + 1
    },
  },
})
