import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
function f1(arg) {
  console.log('f1', arg)
  return arg
}
function f2(arg) {
  console.log('f2', arg)
  return arg
}
function f3(arg) {
  console.log('f3', arg)
  return arg
}
function compose(...funcs) {
  if (funcs.length === 0) return (args) => args
  else if (funcs.length === 1) return funcs[0]
  else {
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }
}
console.log(compose(f1, f2, f3)('omg'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
