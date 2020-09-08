//类继承就是是子类一种 接口的功能时扩展功能1比如圆继承形状这个接口 想拓展可写这个功能 就可以写write接口让他继承

//!装饰器只能在ts里面且在es6类里面执行 若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用experimentalDecorators编译器选项：
class Log {
  @myLog
  print(msg) {
    console.log(msg)
  }
}

function myLog(target, property, descriptor) {
  let old = target.property
  descriptor.value = (msg) => {
    msg = `hhhhh ${msg}`
    old(msg)
  }
  return descriptor
}
