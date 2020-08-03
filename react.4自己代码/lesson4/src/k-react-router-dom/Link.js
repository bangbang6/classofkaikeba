import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Link extends Component {
  static contextType = RouterContext
  //todo 禁掉原先的行为
  handleClick = (e) => {
    e.preventDefault()
    this.context.history.push(this.props.to)
  }
  render() {
    let { to, children, ...restProps } = this.props
    return (
      <a href={to} {...restProps} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}
