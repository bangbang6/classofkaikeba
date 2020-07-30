export function logger({ getState }) {
  //!即传入一个dispatch返回一个加强的dispatch 接受一个弱的dispatch即next 返回一个强的dispatch即(action)=>{xxx}
  //!next都是传入action的函数 funciton(action){xxx} 返回的也是传入action的函数 保持和dispatch参数一致 只是函数里面有自己的逻辑 然后next(action)表示执行下一个中间件的逻辑 最后在执行原生的dispatch方法(因为最后的next就是action)
  return (next) => (action) => {
    let prevState = getState()
    console.log('执行了', action.type)
    console.log('prev state', prevState)
    let returnVal = next(action)
    let nextState = getState()
    console.log('next state', nextState)
    return returnVal
  }
}
