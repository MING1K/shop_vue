<template>
  <div>
    小明爸爸现在有{{ money }}元
    <hr />
    <h2>不使用sync修饰符</h2>
    <!-- 
        :money 父组件给子组件传递props
        @update:money 给子组件绑定的自定义事件只不过名字叫做update:money
     -->
    <sync-child :money="money" @update:money="(e) => (money = e)"></sync-child>
    <hr />
    <h2>使用sync修饰符</h2>
    <!-- 
        :money.sync:
            第一,父组件给字符串传递props money
            第二，给当前子组件绑定了一个自定义事件，而且事件名称即为update:money
     -->
    <sync-child-2 :money.sync="money"></sync-child-2>
    <hr />
  </div>
</template>

<script>
import SyncChild from "./SyncChild.vue";
import SyncChild2 from "./SyncChild2.vue";
export default {
  name: "SyncTest",
  data() {
    return {
      money: 10000,
    };
  },
  components: {
    SyncChild,
    SyncChild2,
  },
};
</script>

<style>
</style>