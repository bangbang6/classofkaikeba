import React from 'react'
import { Redirect, Link, BrowserRouter as Route } from 'react-router-dom'
export default function HomePage(props) {
  console.log('match', props.match)
  return (
    <div>
      <h3>homepage</h3>
    </div>
  )
}
