<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <div v-if="error" class="error">{{error}}</div>
    <!--   <p>{{form.rules[prop]}}</p> -->
  </div>
</template>

<script>
//label 和错误提示
import emitter from '../mixins/emitter'
import Schme from 'async-validator'
export default {
  componentName: "kFormItem",
  inject: ['form'],
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  data () {
    return {
      error: ""
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    })
    //通知kform新增一个kformitem实例
    if (this.prop) {
      this.dispatch('KForm', 'kkb.form.add', [this])
    }

  },
  methods: {
    validate () {
      //进行表单校验
      console.log('validate')
      //开始校验
      let rules = this.form.rules[this.prop]
      let value = this.form.model[this.prop]

      let schema = new Schme({ [this.prop]: rules })
      return schema.validate({ [this.prop]: value }, (err) => {
        if (err) {
          this.error = err[0].message
        } else {
          this.error = ""
        }
      })
    }
  },

}
</script>

<style>
.error {
  color: red;
}
</style>