import React from 'react'
import HomePage from './pages/HomePage'
import UsePage from './pages/UsePage'
import Product from './pages/Product'
import _404Page from './pages/_404Page'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import PrivateRouter from './pages/PrivateRouter'
import Login from './pages/Login'
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户</Link>
        <Link to="/product">商品</Link>
        <Link to="/login">登录</Link>
        <Switch>
          {' '}
          {/* 会破坏children的规则必须完全匹配才会显示children,如果不包switch那么children一定会渲染 */}{' '}
          {/* 从上往下匹配到一个就停止 */}
          <Route
            exact
            path="/"
            component={HomePage}
            //无论是否匹配都会渲染 这就是普通组件都会有的children的props chilren>component>render //children有两种形式 一个是写个函数传props一个是写<route><children /></route>这是对象 函数一定会渲染而组件要匹配才会渲染
            //children={() => <div>childrenpage</div>}
            render={() => <div>render page</div>}
          />
          {/* 相当于router-view */}
          <PrivateRouter path="/user" component={UsePage} />
          <Route path="/product/:id" component={Product} />
          <Route path="/login" component={Login} />
          {/* 相当于router-view */}
          <Route component={_404Page} /> {/* 相当于router-view */}
        </Switch>
      </Router>
    </div>
  )
}
let a = 0
function* helloGenerator() {
  yield 'hello'
  yield 'generator'
  yield (a = 1 + 1)
  return 'a'
}
let hw = helloGenerator()
//!hw是返回值是个指针 惰性求值 只有next到啦才会执行到相关语句 否则不会执行函数里面的语句即a值只有第三个next()执行后才会改变a值
console.log(a) //a=0
console.log(hw.next())
console.log(hw.next())
console.log(hw.next())
console.log(a) //a=2
export default App
