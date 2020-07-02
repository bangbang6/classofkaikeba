<template>
  <p>grandson</p>
</template>

<script>
export default {
  inject: ['provide', 'child1Data', 'child1Vm'],
  props: ['name', 'mes'],
  mounted () {
    console.log(this.mes, this.name)
    console.log(this.child1Data)
    console.log(this.child1Vm.value + "grandson")
    this.$emit("foo")
  }
}
</script>

<style>
</style>