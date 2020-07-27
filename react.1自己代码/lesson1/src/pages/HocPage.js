import React, { Component } from 'react'

//props那里开始时返回一个函数组件 里面使用到传入的Cmp组件
let foo = (Cmp) => (props) => {
  return (
    <div>
      <Cmp {...props}></Cmp>
    </div>
  )
} /* function Foo(props){
  return (<div><Cmp {...props}/></div>)
} */ //FOO应该时一个这样子的组件如下 也可以链式调用
/* function Child(props) {
  return <div>child - {props.name}</div>
}
let Foo = foo(foo(Child)) */
//类组件的高阶组件
/* function foo(Cmp,data){
  return class extends React.Component{
    render(){}
  }
} */
@foo
class Child extends Component {
  render() {
    return <div>child-{this.props.name}</div>
  }
}
export default class HocPage extends Component {
  render() {
    return (
      <div>
        <Child name="参数"></Child>
      </div>
    )
  }
}
