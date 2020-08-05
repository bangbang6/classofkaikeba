//action是个包含以dispatch为参数的函数
//thunk形式
import LoginService from '../service/login'

/* export let login = (userInfo) => {
  return async function (dispatch) {
    
  } 
} */
export let login = (userInfo) => (dispatch) => {
  LoginService.login(userInfo).then(
    (res) => {
      //拿到res信息继续查找
      getMoreUserInfo(dispatch, res)
    },
    (err) => {
      dispatch({ type: 'LOGIN_FAILURE', payload: err })
    }
  )
}
let getMoreUserInfo = (dispatch, userInfo) => {
  return LoginService.getMoreUserInfo(userInfo).then((res) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: { ...res } })
  })
}
