import React, { Component } from 'react'
import { FieldContext } from './FieldContext'

export default class Field extends Component {
  static contextType = FieldContext
  componentDidMount() {
    let { registerEntity } = this.context
    this.cancel = registerEntity(this)
  }
  componentWillUnmount() {
    this.cancel()
  }
  onStoreChange = () => {
    this.forceUpdate()
  }
  getControll() {
    let { name } = this.props
    let { setFieldsValue, getFieldValue } = this.context
    return {
      value: getFieldValue(name),
      onChange(e) {
        let value = e.target.value
        setFieldsValue({ [name]: value })
      },
    }
  }
  render() {
    let { children } = this.props
    let returnChild = React.cloneElement(children, this.getControll())
    return returnChild
  }
}
