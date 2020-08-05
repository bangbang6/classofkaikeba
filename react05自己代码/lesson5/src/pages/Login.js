import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
/* import { login } from '../action/user' */

export default connect(
  (state) => ({
    isLogin: state.user.isLogin,
    loading: state.user.loading,
    err: state.user.err,
  }),
  {
    login: (userinfo) => ({ type: 'LOGINSAGA', payload: userinfo }),
  }
)(
  class Login extends Component {
    constructor(props) {
      super(props)
      this.state = {
        value: '',
      }
    }

    render() {
      let { isLogin, location, login, loading, err } = this.props
      //console.log('props', this.props) //match是当前匹配的信息history是处理页面跳转的库 location是当前位置和状态
      let { from = '/' } = location.state || {} //Route组件会传过来...context信息 包括啦history match location 而redirect的to方法传递的state就会加到location.state里面 只有redirect过来的才有state 其他的都是回首页
      if (isLogin) {
        return <Redirect to={from}></Redirect>
      }
      return (
        <div>
          <input
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          ></input>
          {err ? <p>{err.msg}</p> : null}
          <button onClick={() => login({ name: this.state.value })}>
            {loading ? 'loading' : 'click'}
          </button>
        </div>
      )
    }
  }
)
