import { TEXT, PLACEMENT } from './const'
let nextUnitOfWork = null
let wipRoot = null // 根fiber
/**
 * fiber架构 是vnode的多加一个指针形式
 * child 第一个子元素
 * sibing 兄弟元素
 * return 父元素
 * type 类型
 * node 真实dom
 * base 旧dom
 * props
 * effectTag：标记要进行操作的类型(删除，插入，更新)
 */
//vnode是虚拟dom node是指真实dom
//将vnode变成真实dom插入
function render(vnode, container) {
  /*  let node = createNode(vnode)
  container.appendChild(node)
  console.log('vnode', vnode, container) */
  console.log(vnode)

  wipRoot = {
    node: container,
    props: { children: [vnode] },
  }
  nextUnitOfWork = wipRoot
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
  //reconcileChildren(vnode.props.children, node)
  updateNode(node, vnode.props)
  return node
}
//对孩子vnode的转变(孩子vnode都可能是数组)和插入处理
function reconcileChildren_old(children, node) {
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
function updateClassComponent_old(vnode) {
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

//!我们现在写的只是初次渲染 更新下次再做 children最开始是vnode最后变成啦fiber 最开始的根root是fiber 其他的都是children由vnode->fiber 根fiber无type只有child
function reconcileChildren(fiber, children) {
  //构建fiber架构
  let prevSibiling = null
  for (let i = 0; i < children.length; i++) {
    let child = children[i]
    //构建fiber 传进来的还是只有props和type的对象 在这里才是创建fiber
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: fiber,
      effectTag: PLACEMENT,
    }
    if (i === 0) fiber.child = newFiber
    else prevSibiling.sibling = newFiber
    prevSibiling = newFiber
  }
}
// !暗号:"加蓬"
//fiber处理类组件
function updateClassComponent(fiber) {
  console.log('enter')
  let { type, props } = fiber
  let classCmp = new type(props)
  let children = [classCmp.render()]
  console.log('children', children)
  reconcileChildren(fiber, children)
}
//fiber处理函数组件
function updateFunctionFiber(fiber) {
  let { type, props } = fiber
  let children = [type(props)]

  reconcileChildren(fiber, children)
}
//fiber处理元素标签
function updateHostComponent(fiber) {
  //第一次初始化
  if (!fiber.node) {
    fiber.node = createNode(fiber)
  }
  //协调子元素 也是第一次初始化时候 构建fiber架构
  let { children } = fiber.props
  reconcileChildren(fiber, children) //对一层children处理完后获得啦下一个的任务此时会继续requestIdleCallback继续走递归一直深度遍历的顺序执行performUnitOfWork处理孩子
}
function performUnitOfWork(fiber) {
  //执行当前任务 初始化就是搭建fiber架构(vnode->fiber) 跟新就是diff
  let { type } = fiber
  if (typeof type === 'function') {
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionFiber(fiber)
  } else {
    updateHostComponent(fiber)
  }
  //获取下个任务
  if (fiber.child) return fiber.child
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.return
  }
  return null
}
function workloop(deadline) {
  //有下个任务且当前帧没结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  //没有子任务
  if (!nextUnitOfWork && wipRoot) {
    //todo 提交
    commitRoot()
  }
  //持续获取当前空余时间方便后面更新
  requestIdleCallback(workloop)
}
function commitRoot() {
  commitWorker(wipRoot.child) // wiproot的dom已经挂载好啦即传进来的container
  wipRoot = null
}
function commitWorker(rootFiber) {
  if (!rootFiber) return
  let parentFiber = rootFiber.return
  while (!parentFiber.node) {
    parentFiber = parentFiber.return
  }
  if (rootFiber.effectTag === PLACEMENT && rootFiber.node !== null) {
    parentFiber.node.appendChild(rootFiber.node)
  }
  commitWorker(rootFiber.child) //子孙也要插入
  commitWorker(rootFiber.sibling) //子孙也要插入
}
requestIdleCallback(workloop) // 浏览器会在间隔时间里面执行wookloop
export default { render }
