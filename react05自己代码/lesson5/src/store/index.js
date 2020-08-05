import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import mySaga from './mySaga'
import loginSaga from '../action/loginSaga'
import rootSaga from '../action/rootSaga'
const userInit = {
  isLogin: false,
  userInfo: { id: null, name: '', score: 0 },
  loading: false,
  err: { msg: '' },
}

// 定义修改规则
export const loginReducer = (state = { ...userInit }, { type, payload }) => {
  switch (type) {
    case 'REQUEST':
      return { ...state, loading: true }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLogin: true,
        loading: false,
        userInfo: { ...payload },
      }
    case 'LOGIN_FAILURE':
      return { ...state, ...userInit, ...payload }
    case 'LOGOUT_SUCCESS':
      return { ...state, isLogin: false, loading: false }
    default:
      return state
  }
}

let newReducers = combineReducers({ user: loginReducer })
//创建
let sagaMiddleware = createSagaMiddleware()

let store = createStore(newReducers, applyMiddleware(sagaMiddleware))
//运行
sagaMiddleware.run(rootSaga)
export default store
