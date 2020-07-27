import React, { Component } from 'react'

export function createForm(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {} // options不需要引起render
      this.options = {}
    }
    getFieldDecorator = (field, option) => (InputCmp) => {
      this.options[field] = option
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || '',
        onChange: (e) => {
          let { name, value } = e.target
          this.setState({ [name]: value }) //自动rendedr 不需要forceupdate
        },
      })
    }
    setFieldsValue = (newState) => {
      this.setState({ ...this.state, ...newState })
    }
    getFieldsValue = () => {
      return this.state
    }
    //校验函数 作业处
    validateFields = (callback) => {
      //暗号:"西撒哈拉"
      let err = []
      for (let field in this.options) {
        let rules = this.options[field].rules
        //遍历所有的规则 这里只写了一个规则 且这里只讨论equired:true这项,所以源码处我也只写了这一个validate
        rules.forEach((rule) => {
          if (rule.required === true) {
            if (!this.state[field] || this.state[field] === '') {
              err.push({ err: rule.message })
            }
          }
        })
      }
      if (err.length === 0) {
        callback(null, this.state)
      } else {
        callback(err, this.state)
      }
    }
    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields,
        },
      }
    }
    render() {
      return <Cmp {...this.props} {...this.getForm()} />
    }
  }
}
