import { TEXT } from './const'

//vnode是虚拟dom node是指真实dom
//将vnode变成真实dom插入
function render(vnode, container) {
  let node = createNode(vnode)
  container.appendChild(node)
  console.log('vnode', vnode, container)
}
//虚拟dom->真实dom
function createNode(vnode) {
  let { type } = vnode
  let node = null
  if (type === TEXT) {
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    node = document.createElement(type)
  } else if (typeof type === 'function') {
    //判断函数组件还是类组件 type:class ClassComponet || f functionComponent
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode)
  } else {
    node = document.createDocumentFragment() // 方便<></>的占用
  }
  reconcileChildren(vnode.props.children, node)
  updateNode(node, vnode.props)
  return node
}
//对孩子vnode的转变(孩子vnode都可能是数组)和插入处理
function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node)
      }
    } else render(child, node)
  }
}
//将props属性代理转到node上
function updateNode(node, nextValue) {
  Object.keys(nextValue)
    .filter((k) => k !== 'children')
    .forEach((k) => {
      node[k] = nextValue[k] //nodeValue复制到Node上
    })
}
//对类组件的vnode转成真实dom
function updateClassComponent(vnode) {
  let { type, props } = vnode
  let cmp = new type(props) // 创建类组件的实例
  let vvnode = cmp.render() //获取该实例的vnode
  let node = createNode(vvnode) // 创建真实dom
  return node
}
//函数组件处理v
function updateFunctionComponent(vnode) {
  let { type, props } = vnode
  let vvnode = type(props)
  let node = createNode(vvnode) // 创建真实dom
  return node
}
export default { render }
