import React, { Component } from 'react'
import { createForm } from '../components/my-rc-form'
import Input from '../components/Input'
const nameRules = { required: true, message: '请输入姓名！' }
const passwordRules = { required: true, message: '请输入密码！' }
@createForm
class MyRCForm extends Component {
  constructor(props) {
    super(props)
  }
  submit = () => {
    console.log('submit')
    let { getFieldsValue, validateFields } = this.props.form
    validateFields((err, val) => {
      if (err) {
        console.log(err)
      } else {
        console.log('成功', getFieldsValue())
      }
    })
  }
  componentDidMount() {
    this.props.form.setFieldsValue({ username: 'default' })
  }
  render() {
    console.log('form', this.props.form)
    let { getFieldDecorator } = this.props.form
    return (
      <div>
        {getFieldDecorator('username', { rules: [nameRules] })(
          <Input placeholder="username"></Input>
        )}{' '}
        {/* //getFieldDecorator 就是加上啦value和onchange */}
        {getFieldDecorator('password', { rules: [passwordRules] })(
          <Input placeholder="password"></Input>
        )}
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}
export default MyRCForm
