//commonjs 后台模块
//暗号“BBQ”
//里面每个key都是dep 然后每个对象都是observer实例 data:{a:1,obj:{b:1}}假如val还是对象 则obj继续observer实例 第一个a:1不会创建Ibserver实例因为不是对象 但是obj这个对象遍历响应式时候会创建dep
//会直接返回 记住一个对象一个observe
//watcher一个组件一个 dep和watcher多对多
//data:{obj:{a:1,b:2}} 一个对象一个ob 一个组件一个watcher 一个key一个dep
//obj有个dep他管理这个对象 比如 this.obj.c= 1
//a有个dep管理a属性 比如this.a = 1
//b同a
//ob左右就是将对象响应式 不然不能递归将所有对象属性响应式 并且可以标记对象 防止重复标记
//this.obj = {a:1}这个{a:1}是一个新对象所以要跟新 就算data里面有obj这个也是新对象
//this.obj.a = 1这个就是老对象 不需要重新new Oberver因为他又_ob_属性
