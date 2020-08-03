import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from './k-react-router-dom'
import HomePage from './pages/HomePage'
import UsePage from './pages/UsePage'
import _404Page from './pages/_404Page'
import Product from './pages/Product'
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户</Link>
        <Link to="/product">商品</Link>
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
          <Route path="/user" component={UsePage} />
          <Route path="/product/:id" component={Product} />
          {/* 相当于router-view */}
          <Route component={_404Page} /> {/* 相当于router-view */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
