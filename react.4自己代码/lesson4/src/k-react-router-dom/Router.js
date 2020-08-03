import React, { Component } from 'react'
import { RouterContext } from './Context'

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return {path: "/", url: "/", params: {}, isExact: pathname === "/"};
  }
  constructor(props) {
    super(props)
    this.state = {
      location: props.history.location,
    }
    //路径发生变化时候会执行回调 类似发布订阅
    this.unlisten = props.history.listen((location) => {
      //传一个新的location给后面这时候就会改变路径给后面route刷新
      this.setState({ location })
    })
  }
  componentWillUnmount() {
    if (this.unlisten) this.unlisten()
  }
  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}
