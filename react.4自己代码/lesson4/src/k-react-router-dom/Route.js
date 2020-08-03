import React, { Component } from 'react'
import { RouterContext } from './Context'
import matchPath from './matchPath'

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          let { component, children, render, path, computedMatch } = this.props
          //不匹配的话会返回null 如果path不传是Undifined那么直接返回context.match一定会渲染出来 比如404
          let match = computedMatch //这个是switch计算来的新规则match 加了swich后 children不匹配也不会渲染因为switch只返回了那一个route组件
            ? computedMatch
            : path
            ? matchPath(context.location.pathname, this.props)
            : context.match
          let props = {
            ...context,
            match,
          }
          /*  //createElement第二个参数就是放在组件上面的props 和cloneElement一样
          return match ? React.createElement(component, props) : null */
          //就算没匹配也会返回children是函数的组件
          return (
            <RouterContext.Provider value={props}>
              {' '}
              {/* 因为找context是找最近的provider 所以这里有就不会去找router的provider 而此处的provider是更新过的，router的provider的match是默认的 */}
              {match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? children(props)
                : null}
            </RouterContext.Provider>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}
