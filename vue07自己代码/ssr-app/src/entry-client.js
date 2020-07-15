const { createApp } = require('./main')

//还原store.state
//render会把他放在window.__inital_state

//激活
let { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceStore(window.__INITIAL_STATE__)
}
router.onReady(() => {
  app.$mount('#app')
})
