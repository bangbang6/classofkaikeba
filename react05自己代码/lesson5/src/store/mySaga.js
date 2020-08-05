//redux-saga是用于管理副作用的库
//1.调用异步操作call 2.状态更新 dispatch put 3.监听状态 takeEvery
//!takeevery监听dispatch 异步操作用call  状态更新用Put 注意 soga所有的api前面都要用yield
import { call, put, takeEvery } from 'redux-saga/effects'
function* loginHandle(action) {
  console.log('action', action)
  /* let res = yield call(axio  s.get,params) */ //用call异步操作
  /* yield put({type:"login"}) //! 这里就是链接store的方法*/
}
function* mySaga(props) {
  console.log('enter saga')
  //监听login这个type执行loginHandle方法 //相当于dispatch会在这里加一层中间件 这儿是login的dispatch在这加了一层处理函数 可以做副操作比如异步请求
  yield takeEvery('login', loginHandle)
}

export default mySaga
