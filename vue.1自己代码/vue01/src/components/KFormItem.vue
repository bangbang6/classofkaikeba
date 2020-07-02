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
import Schme from 'async-validator'
export default {
  inject: ['form'],
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