<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
// 数据 model 校验规则 全局校验方法
export default {
  provide () {
    return {
      form: this //传递Kform实例本身
    }
  },
  componentName: "KForm",
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: Object
  },
  created () {
    this.fields = []
    this.$on('kkb.form.add', item => {
      //item是一个Item实例
      this.fields.push(item)
    })
  },
  methods: {
    validate (cb) {
      //1.执行所有的promise执行结果
      let tasks = this.fields.map(item => item.validate())
      Promise.all(tasks).then(() => cb(true)).catch(() => { cb(false) })
    }
  }


}
</script>

<style>
</style>