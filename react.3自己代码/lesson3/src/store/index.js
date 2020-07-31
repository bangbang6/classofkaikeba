import { createStore } from '../kredux/createStore'
import { applyMiddleware } from '../kredux/applyMiddleware'
import { thunk } from '../kredux/thunk'
import { logger } from '../kredux/logger'
import { promise } from '../kredux/promise'
import { combineReducers } from '../combineReducers'

let defaultState = 0
let reducer = (state = defaultState, { type, payload = 1 }) => {
  switch (type) {
    case 'add':
      return state + payload
    case 'minus':
      return state - payload
    default:
      return state
  }
}
let newReducers = combineReducers({ count: reducer })
export default createStore(newReducers, applyMiddleware(promise, thunk, logger))
