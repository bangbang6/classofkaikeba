import React from 'react'
import { FieldContext, FieldProvider } from './FieldContext'
import useForm from './useForm'

export default function Form(props) {
  let { children, onFinish, onFinishFailed, form } = props
  let [FormInstance] = useForm(form)
  FormInstance.setCallback({
    onFinish: onFinish,
    onFinishFailed: onFinishFailed,
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        FormInstance.submit()
      }}
    >
      <FieldProvider value={FormInstance}>{children}</FieldProvider>
    </form>
  )
}
//暗号 西撒哈拉
