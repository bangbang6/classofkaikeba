import React from 'react'

import _Form from './Form'
import Field from './Field'
import useForm from './useForm'
let Form = React.forwardRef(_Form) //给函数式组件ref参数
Form.useForm = useForm
export { Field, useForm }
export default Form
