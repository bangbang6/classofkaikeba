<template>
  <div>
    <p>child2</p>
    <slot name="content" foo="foo"></slot>
    <!-- 作用域插槽 数据来自子组件 用属性穿给父组件 -->
  </div>
</template>

<script>

export default {
  mounted () {
    this.$bus.$emit('busEvent', 'child2->child1的eventbus')
    this.$parent.$emit('parentEvent', 'child2->child1的parent事件')
  }
}
</script>

<style>
</style>