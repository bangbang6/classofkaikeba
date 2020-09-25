console.log('第三节课内容')

import css from './index3.css'
let btn = document.createElement('button')

btn.innerHTML = '新增'

document.body.appendChild(btn)

btn.onclick = function () {
  let div = document.createElement('div')
  div.innerHTML = '新增'
  document.body.appendChild(div)
}
/* import counter from './counter'
import number from './number'
counter()
number()
if (module.hot) {
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'))
    number()
  })
} */
/* const arr = [new Promise(() => {}), new Promise(() => {})]

arr.map((item) => {
  console.log(item)
}) */
/* import React, { Component } from 'react'
import ReactDom from 'react-dom'
class App extends Component {
  render() {
    return <div>hello react</div>
  }
}
ReactDom.render(<App />, document.getElementById('app')) */

/* const webpack = require('webpack')

const config = require('../webpack.config')

const compiler = webpack(config)
Object.keys(compiler.hooks).forEach((name) => {
  compiler.hooks[name].tap('xxxx', () => {
    console.log(name + '触发')
  })
})
compiler.run() */
