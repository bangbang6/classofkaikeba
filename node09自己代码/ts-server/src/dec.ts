class Log {
  @decorate
  print(mes) {
    console.log(mes)
  }
}

/**
 * 修饰器 高阶函数就变成啦工厂 所以要变工厂 加个高阶函数 同时也是柯里化
 * @param target 修饰的类
 * @param property 增加的功能
 */
const dec = (name) => (target, property) => {
  const old = target.prototype[property] //旧的方法

  target.prototype[property] = (msg) => {
    msg = `${name} -${msg}`
    old(msg)
  }
}

//!es6提供装饰器@注解语法形式支持 是es6
/**
 *
 * @param target 类名字
 * @param property 属性名字(可以是函数或者对象)
 * @param descriptor 属性描述符
 */
function decorate(target, property, descriptor) {
  let oldValue = descriptor.value
  descriptor.value = (mes) => {
    mes = `[${mes}]`
    return oldValue.apply(null, [`${mes}`])
  }
  return descriptor
}

const anotation = (target, proterty, decorate) => {
  let descriptor = decorate(
    target.prototype,
    proterty,
    Object.getOwnPropertyDescriptor(target.prototype, proterty)
  )
  Object.defineProperty(target.prototype, proterty, descriptor)
}
anotation(Log, 'print', decorate)
//dec('bang')(Log, 'print')

let log = new Log()
log.print('ts')
