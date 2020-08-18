import React from './kreact/index'
import ReactDOM, { useState } from './kreact/react-dom'
import Component from './kreact/Component'
import './index.css'
import DiffPage from './pages/DiffPage'
class ClassComponent extends Component {
  static defaultProps = {
    color: 'pink',
  }
  render() {
    return (
      <div className="compoenntclass">
        class组件 - {this.props.name}
        <p className={this.props.color}>defaultProps</p>
      </div>
    )
  }
}
function FunctionComponent(props) {
  let [count, setCount] = useState(0)
  return (
    <div className="functionComp">
      function组件 - {props.name}
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {count % 2 ? <div>omg</div> : <button>omg2</button>}
    </div>
  )
}
let jsx = (
  <div className="border">
    <p> 全栈</p> <a href="https://www.baidu.com/">百度</a>
    <ClassComponent name="class"></ClassComponent>
    <FunctionComponent name="function">
      {/* jsx会把{}里面执行 且组件里面的都是自动转成children  children的第一项是这个返回的dom数组 也可以多部分数组那么children就有多项每项都是数组*/}
      {[1, 2].map((item) => (
        <div>item-{item}</div>
      ))}
      {/* jsx会把{}里面执行 且组件里面的都是自动转成children  children的第一项是这个返回的dom数组 也可以多部分数组那么children就有多项每项都是数组*/}
      {[3, 4].map((item) => (
        <div>item-{item}</div>
      ))}
    </FunctionComponent>
    {/* <>
      <p>frag</p>
      <p>frag2</p>
    </> */}
  </div>
)
ReactDOM.render(<DiffPage />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
