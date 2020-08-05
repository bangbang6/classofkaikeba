import { take, call, fork, put } from 'redux-saga/effects'
import LoginService from '../service/login'
export default function* loginSaga() {
  yield takeEvery('LOGINSAGA', handleLogin)
}
function* handleLogin(action) {
  try {
    yield put({ type: 'REQUEST' })
    let res1 = yield call(LoginService.login, action.payload) //第一个参数执行的函数 第二个参数是第一个函数的参数
    //否则就要在回调函数里面写啦
    //call是阻塞性调用必须执行完这个才能执行其他的 fork是不阻塞性在后台执行 这样给异步操作一个可以后执行的机会否则一直都要等待 当下面的操作需要上面的操作用call 不用的话用fork
    let res2 = yield call(LoginService.getMoreUserInfo, res1)
    yield put({ type: 'LOGIN_SUCCESS', payload: { ...res2 } })
  } catch (err) {
    yield put({ type: 'LOGIN_FAILURE', payload: err })
  }
}
let takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      let action = yield take(pattern)
      yield fork(saga, ...args.concat(action))
    }
  })
