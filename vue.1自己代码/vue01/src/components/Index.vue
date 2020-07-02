<template>
  <div>
    <p>parent</p>
    <child1 name="child1" value="123456" mes="来自index" @foo="eventChild"></child1>
    <child2>
      <template v-slot:content="slotProps">具名插槽 {{slotProps.foo}}</template>
      <!-- 用等号接受slotprops子组件传来的数据 -->
    </child2>
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名： " prop="username">
        <KInput v-model="model.username" placeholder="请输入"></KInput>
      </KFormItem>
      <KFormItem label="密码 " prop="password">
        <KInput v-model="model.password" placeholder="请输入"></KInput>
      </KFormItem>
      <!-- <p>{{model}}</p> -->
      <KFormItem>
        <button @click="login">login</button>
      </KFormItem>
    </KForm>
  </div>
</template>

<script>
import child1 from './child1'
import child2 from './child2'
import KInput from './KInput'
import KFormItem from './KFormItem'
import KForm from './Kform'
import { create } from '../utils/create'
import Notice from './Notice'
export default {
  provide () {
    return {
      'provide': 'provideMes '
    }
  },
  data () {
    return {
      model: {
        username: "tom",
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: "亲输入用户名" }],
        password: [{ required: true, message: "亲输入用户名" }]
      }
    }
  },
  components: {
    child1, child2, KInput, KFormItem, KForm
  },
  mounted () {
    //￥children的index是根据真正渲染时间来的
    this.$children[0].parentUseEvent()
  },
  methods: {
    eventChild () {
      console.log('从孙子触发事件')
    },
    login () {
      this.$refs.loginForm.validate(isValidate => {
        create(Notice, {
          title: "村长喊你来搬砖",   //暗号是村长喊你来搬砖
          message: isValidate ? "请求登录" : "校验失败",
          duration: 3000
        }).show()
        /* if (isValidate) {
          console.log('ok')
        } else {
         
        } */
      })
    }
  }
}
</script>

<style>
</style>