import React, { useState, useMemo } from 'react'

export default function KMemo() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('') //value值改变会引起重新render会执行expensive()函数 这时候我们要用的是expensive()这个返回值我们就需要记住这个函数的返回值，让他渲染render时候发现expensive()返回值是有的所以不去执行函数这时候expensive就不是个函数而是个值；啊
  let handleClick = () => {
    setCount(count + 1)
  }
  let expensive = useMemo(() => {
    console.log('computed')
    let sum = 0
    for (let i = 0; i <= count; i++) {
      sum += i
    }
    return sum
    //count变额时候执行函数
  }, [count])
  return (
    <div>
      <p>{count}</p>
      <p>{expensive}</p>
      <button onClick={handleClick}>ADD</button>
      <input value={value} onChange={(e) => setValue(e.target.value)}></input>
    </div>
  )
}
