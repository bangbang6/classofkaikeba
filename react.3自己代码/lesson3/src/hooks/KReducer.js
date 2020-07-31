//数组解构 这样子只和顺序有关 与名字无关 好处就是可以自己定义名字
//!useReducer 就是useState的替代品(不能替代react-redux因为创建的是新state对象不是一个对象不能共享) 只是state可以复杂的数据结构 useState只能是比较简单的结构
//函数式组件在useeffect或者useReduer里面值改变的时候这两个hook会强制渲染，
//!只有这两个hook有刷新页面功能 相当于class组件state改变
import React, { useReducer } from 'react'
let reducer = (state = { num: 0 }, action) => {
  switch (action.type) {
    case 'add':
      let newState = {}
      newState.num = state.num + 1
      return newState
    default:
      return state
  }
}
let init = (arg) => {
  arg.num = -1
  return arg
}
export default function KReducer() {
  const [state, dispatch] = useReducer(reducer, { num: 0 }, init)
  return (
    <div>
      <p>{state.num}</p>
      <button onClick={() => dispatch({ type: 'add' })}>add</button>
    </div>
  )
}
