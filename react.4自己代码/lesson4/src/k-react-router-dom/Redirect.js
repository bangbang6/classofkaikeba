import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Redirect extends Component {
  render() {
    return (
      //render函数不要去做跳转 最好return做渲染 所以此处让别的组件Mounted时候跳转
      <RouterContext.Consumer>
        {(context) => {
          let { to, push = false } = this.props
          let { history } = context
          return (
            <LifeCycle
              onMount={() => {
                push ? history.push(to) : history.replace(to)
              }}
            />
          )
        }}
      </RouterContext.Consumer>
    )
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this)
    }
  }
  render() {
    return <div>life</div>
  }
}
