import React, { Component } from 'react'
//children属性就是组件内部传递的对象 可以是对象和jsx <layForm>{{content:'content',txt:'txt'}}</layForm> 那么layform里面的children就是{content:'content',txt:'txt'}对象
export default class ClassComponent extends Component {
  constructor(props) {
    super(props)
    //存储状态
    this.state = {
      date: new Date(),
      counter: 0,
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() })
    }, 1000)
    document.querySelector('#app').addEventListener('click', () => {
      this.setState({ counter: this.state.counter + 1 })
      console.log(this.state.counter)
    })
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  setCounter() {
    //在合成事件中异步 在setTimeout和原生事件document.addEventListener('click')中是同步
    this.setState({ counter: this.state.counter + 1 })
    console.log(this.state.counter)
  }
  handleClick() {
    //批量更新的最终操作 也是同步的
    this.setState((state) => {
      return { counter: state.counter + 1 }
    })
  }
  render() {
    let { date, counter } = this.state
    return (
      <div>
        <p>{date.toLocaleTimeString()}</p>
        <button /* onClick={this.setCounter.bind(this)} */ id="app">
          {counter}
        </button>
        <button onClick={this.handleClick.bind(this)}>aaa {counter}</button>
      </div>
    )
  }
}
