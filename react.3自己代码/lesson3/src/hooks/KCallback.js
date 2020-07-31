//!当子组件的props没变时候让子组件不渲染 purecomponet+usecallback：记忆函数当依赖项改变的时候才会执行函数
//!usememo是记忆函数的返回值是一个值不是记忆这个函数对象 usecallback是记忆整个函数 当依赖改变时执行前面的函数改变值 usecallback记忆函数主要是解决参数传函数导致子组件渲染的情况
//子组件purecomponent只要是props没变就不会刷新 当usestate改变时return的dom会重新执行 当碰到有记忆的值或者函数的时候就会返回之前的值或者函数当作没执行函数或者函数引用对象时同一个导致Props也没变
import React, {
  useState,
  useMemo,
  Component,
  PureComponent,
  useCallback,
} from 'react'

export default function KCallback() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('') //value值改变会引起重新render会执行expensive()函数 这时候我们要用的是expensive()这个返回值我们就需要记住这个函数的返回值，让他渲染render时候发现expensive()返回值是有的所以不去执行函数这时候expensive就不是个函数而是个值；啊
  let handleClick = () => {
    setCount(count + 1)
  }
  //只有count改变时候这个函数才会变否则就是拿之前缓存好的函数 所以传props不会变也就不会触发孩子render
  let addClick = useCallback(() => {
    console.log('computed')
    let sum = 0
    for (let i = 0; i <= count; i++) {
      sum += i
    }
    return sum
  }, [count])
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>ADD</button>
      <input value={value} onChange={(e) => setValue(e.target.value)}></input>
      <Child addClick={addClick}></Child>{' '}
      {/* 函数引用每次也不一样就算count没变，因为是pureComponent是钱比较 */}
    </div>
  )
}

class Child extends PureComponent {
  render() {
    console.log('child render')
    let { addClick } = this.props
    return (
      <div>
        <button onClick={() => console.log(addClick())}>child add</button>
      </div>
    )
  }
}
