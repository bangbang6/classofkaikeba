import React, { Component } from 'react'
import { createPortal } from 'react-dom'

export default class Dialog extends Component {
  constructor(props) {
    super(props)
    const doc = window.document
    this.node = doc.createElement('div')
    doc.body.appendChild(this.node)
  }

  componentWillUnmount() {
    if (this.node) {
      window.document.body.removeChild(this.node)
    }
  }

  render() {
    //Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。 this.node可以随便哪个元素 不一定是父元素 这里是body下的div
    //返回jsx 和一般不同就是位置是随你指定的 和父元素无关
    return createPortal(
      <div className="dialog">
        <h3>Dialog</h3>
      </div>,
      this.node
    )
  }
}
