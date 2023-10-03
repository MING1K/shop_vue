<template>
  <div>
    <!-- 使用a标签实现按钮带有提示 -->
    <a :title="title"></a>
    <!-- 下面这种写法不能用 :或@ 只能用v-bind v-on -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </div>
</template>

<script>
export default {
  props: ["title"],
  mounted() {
    // $attrs属于组件的一个属性，可以获取到父组件传递过来的props数据
    // 对于子组件而言，父组件给的数据可以利用props接受，但是需要注意，如果子组件通过props接受的属性，在Sattrs属性当中是获取不到的
    console.log(this.$attrs);
    //$listeners，它也是组件实例自身的一个属性，它可以获取到父组件给子组件传递自定义事件
    console.log(this.$listeners);
  },
};
</script>

<style>
</style>