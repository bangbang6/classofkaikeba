import isPromise from 'is-promise'
export function promise({ dispatch }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(next) : next(action)
  }
}
