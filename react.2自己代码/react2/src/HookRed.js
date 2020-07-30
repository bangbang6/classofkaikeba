import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
export default function HookRed() {
  //参数类似mapstatetoProps
  const count = useSelector((state) => {
    //返回值就是count
    return state
  })
  let dispatch = useDispatch()
  let add = () => {
    dispatch({ type: 'add' })
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  )
}
