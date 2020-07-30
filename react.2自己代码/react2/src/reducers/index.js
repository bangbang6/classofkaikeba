import { combineReducers } from '../combineReducers'
import {createStore} from '../kredux/createStore'
export let reducer1 = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case 'add':
      return state + payload

    default:
      return state
  }
}

export let reducer2 = (state = 1, { type, payload = 1 }) => {
  switch (type) {
    case 'add':
      return state + payload

    default:
      return state
  }
}

export let reducer3 = (state = 2, { type, payload = 1 }) => {
  switch (type) {
    case 'add':
      return state + payload

    default:
      return state
  }
}
export let reducer = combineReducers({ reducer1, reducer2, reducer3 })
export default createStore(reducer)