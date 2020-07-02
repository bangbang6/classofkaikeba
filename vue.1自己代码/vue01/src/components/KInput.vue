<template>
  <!-- 管理数据 实现双向绑定 -->
  <input :type="type" :value="value" @input="handleInput" v-bind="$attrs" />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value) //因为外层v-model是监听Input事件

      //触发校验
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style>
</style>