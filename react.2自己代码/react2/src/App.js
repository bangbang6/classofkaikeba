import React, { useState, useEffect } from 'react'
import store from './store'
function App() {
  const [num, setnum] = useState(0)
  const [numDouble, setnumDouble] = useState(0)
  useEffect(() => {
    store.subscribe(() => {
      setnum(store.getStore())
    })
  }, [num])
  useEffect(() => {
    store.subscribe(() => {
      setnumDouble(store.getStore() * store.getStore())
    })
  }, [numDouble])
  function add() {
    store.dispatch('add', 10)
  }
  return (
    <div className="App">
      <p>{num}</p>
      <p>{numDouble}</p>

      <button onClick={add}>add</button>
    </div>
  )
}

export default App
