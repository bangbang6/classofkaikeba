const router = require('koa-router')()
const { init, get, create, update, del, list } = require('./api')

router.get('/api/:list/:id', init, get) //参数list id 在init get 函数里面用ctx.params获取
router.get('/api/:list', init, list)
router.post('/api/:list', init, create)
router.put('/api/:list/:id', init, update)
router.delete('/api/:list/:id', init, del)

module.exports = router.routes()
