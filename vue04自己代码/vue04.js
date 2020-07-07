//commonjs 后台模块
//暗号“BBQ”
//data对象每个key都是dep 然后每个对象都是observer实例 data:{a:1,obj:{b:1}}假如val还是对象 则obj继续observer实例 第一个a:1不会创建Ibserver实例因为
//会直接返回 记住一个对象一个observe data和obj 然后dep是data下面每个key都是dep这里有两个 通知更新 加上小管家是有observer实例也就是obj的时候有一个负责管理该Obj的通知
//watcher一个组件一个 dep和watcher多对多
