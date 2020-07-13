//暗号:"first blood"
//组讲化 createElement=>vnode时候挂载钩子
// createEle 时候执行钩子挂载dom 并且孩子递归mounted _createElement是针对_c('div',_c("comp","hello"))这种形式的 不是<div>这种形式的</div> 所以子组件先挂载 依次判断‘comp’ ‘div’这些tag因为_c在render函数里面调用两次 显示comp在是div 但是vm此时先是root 后面comp的时候会执行comp的mount在去看comp里面的所有标签
//组件是Vue子类 Vuecomponent类 也会走init初始化
//创建过程init create 是自上而下 挂载过程mounted是自下而上的
