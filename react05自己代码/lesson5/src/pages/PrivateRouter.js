import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
export default connect((state) => ({ isLogin: state.user.isLogin }))(
  function PrivateRouter({ isLogin, component: Component, ...rest }) {
    //采用默认match 直接渲染啦此组件
    //redireact 参数是pathname
    return (
      //不能直接写Login组件因为此时的页面url没变 必须url改变从login
      <Route
        {...rest}
        render={(props) =>
          isLogin ? (
            <Component {...props}></Component>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location.pathname },
              }}
            />
          )
        }
      ></Route>
    )
  }
)
