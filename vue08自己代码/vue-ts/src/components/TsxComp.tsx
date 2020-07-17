import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue/types/umd'
//就完全和react一模一样
@Component //class-style
export default class HelloWorld extends Vue {
  @Prop() private msg!: string
  onclick = (e: MouseEvent) => {
    console.log(e)
  }
  //上面是属性和方法 或者自定义的data数据
  //vue中template和render可以用jsx语法
  render(h: CreateElement) {
    return <div onClick={this.onclick}>{this.msg}</div>
  }
}
