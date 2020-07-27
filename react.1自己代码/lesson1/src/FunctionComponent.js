//函数式组件没有生命钩子和state 只能Props当作参数传递进来 一般和hooks连用
//与其说是组件 不如说是函数 ！！！！！！就是与函数不同在于必须返回jsx其他的没区别！！！！！！
//pureComponent仅仅是自己实现了shouldComponentUPdate方法
import React, { useState, useEffect } from 'react'

export default function FunctionComponent(props) {
  //你需要的state只能用HOOK的useState 想用生命钩子只能用hook的useeffect比如didmount
  const [date, setDate] = useState(new Date()) //hook只能用于最外面且要么在自定义hook中 要么在reactfunction中(与普通function不同在于返jsx)
  useEffect(() => {
    console.log('effect')
    let timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, []) //不加数组表示一直执行(相当于componentwillupdate) 空数组表示只执行一次(此时相当于componentwillmount)
  return <div>{date.toLocaleTimeString()}</div>
}
