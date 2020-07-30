import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
function App(props) {
  /* const [num, setnum] = useState(0) */

  /* useEffect(() => {
    let cb = store.subscribe(() => {
      setnum(store.getState())
    })
    return cb
  }, [num]) */

  /* function propsAdd() {
    //action即里面的对象只支持对象传入 但是很多时候需要传入函数 这时候就需要中间件 解决异步 中间件主要是执行那个函数 ！！最终还是执行dispatch！！所以参数还是要有dispatch让里面调用 ！！只是中间拦截啦一层
    props.dispatch({ type: 'add', payload: 10 })
  } */
  let asyncAdd = () => {
    props.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'add', payload: 10 })
      }, 1000)
    })
  }
  let promiseAdd = () => {
    props.dispatch(Promise.resolve({ type: 'add', payload: 10 }))
  }
  console.log('props', props)
  let { count, add } = props
  return (
    <div className="App">
      <p>{count}</p>
      {/* <button onClick={propsAdd}>propsAdd</button> */}
      <button onClick={add}>ADD</button>
      <button onClick={asyncAdd}>asyncadd</button>
      <button onClick={promiseAdd}>promiseAdd</button>
    </div>
  )
}
//都是函数返回map映射对象
let mapStateToProps = (state) => {
  return {
    count: state,
  }
}

export default connect(
  mapStateToProps /* (dispatch) => {
  return {
    add: () => {
      dispatch({ type: 'add' })
    },
  }
} */
)(App)
