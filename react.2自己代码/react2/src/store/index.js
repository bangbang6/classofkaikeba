import { createStore } from './createStore'
let defaultState = 0
let reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'add':
      return state + payload
  }
}

export default createStore(reducer)
