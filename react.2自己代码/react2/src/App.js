import React, { useState, useEffect } from 'react'
import store from './reducers'
function App() {
  console.log('store', store.getStore())
  const [num, setnum] = useState(0)
  const [numDouble, setnumDouble] = useState(0)
  useEffect(() => {
    let cb = store.subscribe(() => {
      setnum(store.getStore())
    })
    return cb
  }, [num])
  useEffect(() => {
    store.subscribe(() => {
      setnumDouble(store.getStore() * store.getStore())
    })
  }, [numDouble])
  function add() {
    //action即里面的对象只支持对象传入 但是很多时候需要传入函数 这时候就需要中间件 解决异步 中间件主要是执行那个函数 ！！最终还是执行dispatch！！所以参数还是要有dispatch让里面调用 ！！只是中间拦截啦一层
    store.dispatch({ type: 'add', payload: 10 })
  }
  let asyncAdd = () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'add', payload: 10 })
      }, 1000)
    })
  }
  let promiseAdd = () => {
    store.dispatch(Promise.resolve({ type: 'add', payload: 10 }))
  }
  return (
    <div className="App">
      <p>{num}</p>
      <p>{numDouble}</p>

      <button onClick={add}>add</button>
      <button onClick={asyncAdd}>asyncadd</button>
      <button onClick={promiseAdd}>promiseAdd</button>
    </div>
  )
}

export default App
