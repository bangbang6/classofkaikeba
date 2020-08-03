import React, { Component } from 'react'
import { RouterContext } from './Context'
import matchPath from './matchPath'

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          let match, element
          //this.props.children可以遍历所有孩子 因为可能是数组或者对象需要讨论

          React.Children.forEach(this.props.children, (child) => {
            if (match == null && React.isValidElement(child)) {
              element = child
              let path = child.props.path
              //matchPath用正则实现了动态路由
              match = path
                ? matchPath(context.location.pathname, child.props) //如果path和当前url不匹配这里会返回null 由此一直匹配下去直到找到一个匹配的立马停止，然后只渲染那一个组件
                : context.match
            }
          })
          return match
            ? React.cloneElement(element, { computedMatch: match })
            : null
        }}
      </RouterContext.Consumer>
    )
  }
}
