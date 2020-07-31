import React from 'react'
//这两个是react-redux 专有的hook
import { useDispatch, useSelector } from './kReactRedux'
export default function ReduxFunction() {
  const num = useSelector((store) => store.count)
  const dispatch = useDispatch()
  //这两个hook为什么不用useContext因为这个不用订阅刷新如果用usecontext获取store那么就要自己实现订阅强制刷新
  return (
    <div>
      <p>{num}</p>
      <button onClick={() => dispatch({ type: 'add' })}>add</button>
    </div>
  )
}
