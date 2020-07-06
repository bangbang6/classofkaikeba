//数据相应 Model->view: object.definePropoty | proxy 只有响应式数据才能影响视图变化
//初始化的时候没有设置响应式 后面的都需要自己调用$set设置，因为最开始循环定义时没定义 如果初始化时是个对象你改对象要响应式 你得在源码里面写递归定义响应式
//html发现变量 -》创建对应watcher -》负责执行update() 函数  很多watcher 需要dep统一管理 !!!!!!data中每一个属性创建一个dep 页面之中使用多个 则一个deo有多个watcher
//observer时对对象进行响应式处理 通常用在在对data初始化绑定 不要和watcher混啦
//每个对象做响应式处理 就生产一个observer实例 对obj和数组分开操作
//暗号  冬瓜冬瓜我是西瓜
