import { TEXT } from './const'
//bable loader自动调用此方法处理jsx 给我们传入这三个参数
function createElement(type, config, ...children) {
  if (config) {
    delete config.__self
    delete config.__source
  }

  let props = {
    ...config,
    children: children.map((child) =>
      typeof child === 'object' ? child : createTextNode(child)
    ),
  }
  //!对defaultprops处理 暗号:"喀麦隆"
  if (type && type.defaultProps) {
    for (let propName in type.defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = type.defaultProps[propName]
      }
    }
  }
  delete props.key
  return {
    type,
    props,
    key: config.key || '',
  }
}
function createTextNode(text) {
  return { type: TEXT, props: { children: [], nodeValue: text } }
}
export default {
  createElement,
}
