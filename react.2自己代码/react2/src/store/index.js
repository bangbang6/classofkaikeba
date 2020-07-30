import { createStore } from '../kredux/createStore'
import { applyMiddleware } from '../kredux/applyMiddleware'
import { thunk } from '../kredux/thunk'
import { logger } from '../kredux/logger'
import { promise } from '../kredux/promise'
let defaultState = 0
let reducer = (state = defaultState, { type, payload = 1 }) => {
  switch (type) {
    case 'add':
      return state + payload

    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(promise, thunk, logger))
