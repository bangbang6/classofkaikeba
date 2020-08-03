import React from 'react'
import { Redirect, Link, Route } from '../k-react-router-dom'
export default function UsePage(props) {
  let { params, url } = props.match
  console.log(url)
  return (
    <div>
      <p>用户中心</p>
      <Link to={url + '/detail'}>详情</Link>
      <Route path={url + '/detail'} component={Detail} />
    </div>
  )
}
function Detail() {
  return <div>detail</div>
}
