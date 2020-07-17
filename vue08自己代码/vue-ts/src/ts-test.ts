let arr: (number | string)[] = [1, '111']

let greet: (msg: string) => string = function(msg: string): string {
  return '2'
}
function greet2(msg: string): string {
  return '2'
}
//交叉类型 两种类型合并出来的类型
type first = {first:number}
type second = {second:number} 
type third = first & second //表示交集 这两个属性都得有 而不是联合 有其中一个就行 
//&交集 表示类型约束更强 | 并集 表示约束条件宽  


class Parent {
  private _foo = "foo"
  //构造函数参数加pub/pri 相当于直接变成内部属性 不用this.mes = mes
  constructor(private mes= 'def'){

  }
  //存取器 可添加额外逻辑 后面这个也可以是个新变量
  get foo(){
    return this._foo
  }
  set foo(val){
    this._foo  = val
  }
  log(){
    console.log(this.mes)
  }
}
