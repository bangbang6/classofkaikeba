//暗号 村长喊你来搬砖
//this.$bus.on(event,function) 监听事件   this.$bus.emit触发事件 new VUe() =>BUs实例  观察者模式  其实是因为vue里面实现啦on和emit方法 自己创建一个类有这两个方法也行

//发布订阅都是一个人 同一个人收集等待触发 v-bind="obJ"相当于直接obj全部展开向下传递 v-on="obj"相当于所有事件监听向下传递 本来v-bind:a=1是一个 v-bind = {a:2,b:3} a,b都会传递

//provide/inject 注入后代不论多少层 context

//slot等同于children

//思考题 children是哦用 parent使用
//￥mount是把vdom转成真实dom  搞清楚vm.$el是什么 vm

//vue在html里面都是字符串 比如 @click="handleClick" mes = "child" :mes="child" 这个表示传入child这个对象 不是字符串 因为:表示js操作
//react在htm里面是用{} 表示js语句传参如同vue都是先用字符串包裹 如果相传对象不是字符串 用冒号
