<template>
  <div>
    <h2>自定义带hover提示的按钮</h2>
    <!-- 当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数(el-button进行二次封账) -->
    <!-- @click="handlerClick"是绑定的自定义事件 -->
    <hini-button type="success" icon="el-icon-plus" title="添加按钮" size="mini" @click="handlerClick"></hini-button>
  </div>
</template>

<script>
import HiniButton from './AttrsListeners/HiniButton.vue'
export default {
  components: {HiniButton},
  methods: {
    handlerClick() {
      this.$message.success('6666');
    }
  },
}
</script>

<style>

</style>