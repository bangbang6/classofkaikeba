<template>
  <div class="hello">
    <input type="text" @keydown.enter="addFeature" />
    <ul>
      <li
        v-for="feature in features"
        :key="feature.id"
        :class="{selected:feature.selected}"
      >{{feature.name}}</li>
    </ul>
    <div>{{total}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

interface Feature {
  id: number
  name: string
}
interface Select {
  selected: boolean
}
type FeatureSelect = Feature & Select
//第一种声明组件方式
@Component({ mixins: [], props: {} }) //class-style //选项prop会和下面的prop合并 传给component的配置
export default class HelloWorld extends Vue {
  ///加括号说明Prop是个装饰器工厂 返回的才是装饰器 参数是配置对象 这里没传参
  //也可以给Vue传递props选项
  @Prop({ type: String, required: true })
  private msg!: string
  //feature将成为data数据
  features: FeatureSelect[] = []
  hello = 'aaa'
  //生命周期钩子直接用同名函数即可
  async mounted() {
    this.$http.get<FeatureSelect[]>('/api/list').then(res => {
      this.features = res.data
    })
  }
  //默认事件名称是方法名 返回值是触发事件的参数
  @Emit()
  addFeature(e: KeyboardEvent) {
    //EventTarget是比较靠上的类型 表示事件触发东西不一定有value比如div 然而value是Input元素才有的
    let input = e.target as HTMLInputElement //断言成Inputele类型是eventtarget子类
    this.features.push({ id: 3, name: input.value, selected: true })
    input.value = ''
    //相当于this.emit('add-feature',feature)
    this.hello = this.hello + '1'
    return this.features
  }

  @Watch('hello')
  onMesChange(newV: string, oldV: string) {
    oldV
    console.log(newV)
  }
  //存取器当作计算属性使用 后面这个必须在类变量没有 一般获取_foo变量 可以get foo(){retuurn this._foo} 当get a(){return this._foo}也行 只是语义化

  get total() {
    return this.features.length
  }
}

/* //这种也行 第二种声明组件方式 options-style 第三种就是直接jsx和react一模一样 template不是写在最上面 而是render返回tsx 完全和react一样
export default Vue.extend({
  data(){}
}) */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.selected {
  background-color: red;
}

a {
  color: #42b983;
}
</style>
