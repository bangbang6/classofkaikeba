import React, { useContext, useState, useEffect, useReducer } from 'react'
let Context = React.createContext()
export function bindActionCreators(creators, dispatch) {
  let newCreators = {}
  for (let key in creators) {
    let cb = creators[key]
    newCreators[key] = bindActionCreator(cb, dispatch)
  }
  return newCreators
}

function bindActionCreator(cb, dispatch) {
  return (...args) => dispatch(cb(...args))
}
export function Provider({ store, children }) {
 
  return <Context.Provider value={store}>{children}</Context.Provider>
}
export let connect = (
  mapStateToProps = (state) => state,
  mapDispatchToProps
) => (WrapComponent) => (props) => {
  const store = useContext(Context)
  let state = store.getState()
  let dispatch = store.dispatch
  let subscribe = store.subscribe
  let stateProps = mapStateToProps(state)
  let dispatchProps = { dispatch }
  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch)
  } else if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
  }
  let [, forceUpdate] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    let unSubscribe = subscribe(() => {
      forceUpdate()
    })
    return () => {
      unSubscribe && unSubscribe()
    }
  }, [])
  return (
    <WrapComponent {...props} {...stateProps} {...dispatchProps}>
      {' '}
    </WrapComponent>
  )
}
export let useSelector = (selector) => {
  let store = useStore()
  let { subscribe } = store
  let [, forceUpdate] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    let unSubscribe = subscribe(() => {
      forceUpdate()
    })
    return () => {
      unSubscribe && unSubscribe()
    }
  }, [])
  return selector(store.getState())
}
export let useDispatch = () => {
  let store = useStore()
  return store.dispatch
}

function useStore() {
  return useContext(Context)
}
