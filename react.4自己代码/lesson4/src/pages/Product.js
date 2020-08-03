import React, { useState } from 'react'
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
  withRouter,
  Prompt,
} from '../k-react-router-dom'

export default function Product(props) {
  let [leave, setLeave] = useState(true)
  /*let match = useRouteMatch()
  let history = useHistory()
  let location = useLocation()
  let params = useParams() */
  return (
    <div>
      product
      <Prompt
        when={leave}
        message={(location) => {
          //根据Location来判断是否需要提示框
          return 'are you want to leave'
        }}
      ></Prompt>
    </div>
  )
}
/* import { Component } from 'react'
class _Product extends Component {
  render() {
    console.log('props', this.props)
    return <div>pro</div>
  }
}
//!类组件用高阶组件去封装props 函数组件用hooks去封装
let Product = withRouter(_Product)
export default Product */
