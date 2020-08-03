import React from 'react'
import { Redirect, Link, BrowserRouter as Route } from '../k-react-router-dom'
export default function HomePage(props) {
  return <Redirect to={{ pathname: './user' }}></Redirect>
  console.log('match', props.match)
  return (
    <div>
      <h3>homepage</h3>
    </div>
  )
}
