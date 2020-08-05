import React from 'react'
import { Redirect, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'

export default connect(({ user }) => ({ user }))(function UsePage(props) {
  let { params, url } = props.match
  let { user } = props
  let { id, name, score } = user.userInfo
  return (
    <div>
      <p>用户中心</p>
      <p>id:{id}</p>
      <p>name:{name}</p>
      <p>score:{score}</p>
      <Link to={url + '/detail'}>详情</Link>
      <Route path={url + '/detail'} component={Detail} />
    </div>
  )
})
function Detail() {
  return <div>detail</div>
}
