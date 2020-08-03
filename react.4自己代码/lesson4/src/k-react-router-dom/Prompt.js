import React from 'react'
import { RouterContext } from './Context'
//暗号：尼日尔
export default function Prompt({ when = true, message }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        if (!when) return null
        console.log(context.history)
        //阻塞页面跳转函数
        let method = context.history.block

        return (
          <LifeCycle
            onMount={(self) => {
              self.release = method(message)
            }}
            onUnMount={(self) => {
              //解除这个阻塞
              self.release()
            }}
          ></LifeCycle>
        )
      }}
    </RouterContext.Consumer>
  )
}
class LifeCycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this)
    }
  }
  componentWillUnmount() {
    if (this.props.onUnMount) {
      this.props.onUnMount.call(this, this)
    }
  }
  render() {
    return null
  }
}
