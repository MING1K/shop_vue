<template>
  <div>
    <h2>v-model深入</h2>
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>
    <hr/>
    <h2>v-model实现原理（vue2）</h2>
    <!-- 
        Vue2:可以通过value与input事件实现v-model功能
        原生DOM当中是有oninput事件，它经常结合表单元素一起使用，当表单元素文本内容发生变化的时候就会发出发一次回调
     -->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>{{ msg }}</span>
     <hr/>
     <!-- 
        :value是props父子组件通信
        @input是自定义事件
      -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>
    <CustomInput v-model="msg"></CustomInput>
  </div>
</template>

<script>
import CustomInput from './CustomInput.vue';
export default {
  name: "ModelTest",
  components: {CustomInput},
  data() {
    return {
      msg: "hello, world",
    };
  },
};
</script>

<style>
</style>