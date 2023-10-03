<template>
  <div style="background: #ccc; height: 50px">
    <span>son小明有：{{ money }}元</span>
    <button @click="giveMoney(150)">给parent150元</button>
  </div>
</template>

<script>
import MyMixin from './MyMixin/MyMixin.js';
export default {
  data() {
    return {
      money: 10000,
    };
  },
  mixins: [MyMixin],
  // methods: {
  //   giveMoney(num) {
  //     this.money -= num;
  //     //可以通过$parent属性获取到某一个组件父组件，可以操作父组件的数据与方法
  //     this.$parent.money += num;
  //   },
  // },
};
</script>

<style>
</style>