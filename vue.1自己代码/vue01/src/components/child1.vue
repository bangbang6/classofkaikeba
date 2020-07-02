<template>
  <div>
    <p>child1</p>
    <grandson v-bind="$attrs" v-on="$listeners"></grandson>
  </div>
</template>

<script>
//Bus监听 一定是同一个对象 而且一定有$On $emit方法
import grandson from './grandson'

export default {
  data () {
    return {
      child1Mes: "child1Mes"
    }
  },
  provide () {
    return {
      'child1Data': this.child1Mes,
      'child1Vm': this
    }
  },
  props: ['value'],
  components: {
    grandson
  },
  mounted () {
    this.$bus.$on('busEvent', (mes) => {
      console.log(mes)
    })
    this.$parent.$on('parentEvent', (mes) => {
      console.log(mes)
    })

    console.log(this.$listeners) //收获非props的属性
    console.log(this.value) //value是props的直接当data数据调用 是这个实例的属性 所以不用this.props.value和data一样
  },
  methods: {
    parentUseEvent () {
      console.log("parent调用child1的方法")
    }
  }
}
</script>

<style>
</style>