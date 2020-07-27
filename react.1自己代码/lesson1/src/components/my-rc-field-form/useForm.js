import React, { useRef } from 'react'
class FormStore {
  constructor() {
    this.store = {}
    this.fieldEntities = []
    this.callbacks = {}
  }
  registerEntity = (entity) => {
    //entity形成闭包
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity)
      delete this.store[entity.props.name]
    }
  }
  setCallback = (callback) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback,
    }
  }
  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    }
    this.fieldEntities.forEach((entity) => {
      let { name } = entity.props //获取输入的name属性式啥
      Object.keys(newStore).forEach((key) => {
        //新改变的对应entityupdate
        if (key === name) {
          entity.onStoreChange()
        }
      })
    })
  }
  setFieldValue = () => {}
  getFieldValue = (name) => {
    return this.store[name]
  }
  validate = () => {
    let err = []
    // todo
    this.fieldEntities.forEach((entity) => {
      const { name, rules } = entity.props
      let value = this.getFieldValue(name)
      let rule = rules && rules[0]
      if (rule && rule.required && (value === undefined || value === '')) {
        //  出错
        err.push({
          [name]: rules.message,
          value,
        })
      }
    })
    return err
  }

  submit = () => {
    console.log('this.', this.fieldEntities) //sy-log
    let err = this.validate()
    // 在这里校验 成功的话 执行onFinish ，失败执行onFinishFailed
    const { onFinish, onFinishFailed } = this.callbacks
    if (err.length === 0) {
      // 成功的话 执行onFinish
      onFinish(this.getFiledsValue())
    } else if (err.length > 0) {
      // ，失败执行onFinishFailed
      onFinishFailed(err)
    }
  }
  getFiledsValue = () => {
    return this.store
  }
  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      registerEntity: this.registerEntity,
      submit: this.submit,
      setCallback: this.setCallback,
    }
  }
}
//！！！！！hook函数 和普通函数不一样就是一点 它可以使用hook所以要优点限制 才能用hook！！！重要 其他就和函数一样
export default function useForm(form) {
  let formRef = useRef()
  if (!formRef.current) {
    if (form) {
      formRef.current = form
    }
    let formStore = new FormStore()

    formRef.current = formStore.getForm()
  }
  return [formRef.current]
}
