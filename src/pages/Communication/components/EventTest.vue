
import Handler from 'dist/js/chunk-vendors.65226ad1';

import Handler from 'dist/js/chunk-vendors.65226ad1';
<template>
  <div>
    <h1>EventTest</h1>
    <button @click="handlerClick">原生DOM绑定事件</button>

    <!-- Event1组件:Event1非原生DOM节点,而绑定的click事件并非原生DOM事件，而是自定义事件, @click="handlerClick1"不会执行 -->
    <!-- @click.native可以将自定义事件转为原生DOM事件 -->
    <!-- 当前原生DOM的click事件，其实是给子组件的根节点绑定了点击事件————利用到了事件委派 -->
    <event-test-event-1 @click.native="handlerClick1"></event-test-event-1>
    
    <!-- 
        下面的写法是给原生DOM绑定自定义事件 
        给原生DOM绑定自定义事件没有任何意义的，
        因为没有办法触发$emit函数 
    -->
    <button @xxx="handlerClick2">原生DOM绑定自定义事件(没有意义)</button>

    <event-test-event-2 @xxx="handlerClick3" @click="handlerClick3"></event-test-event-2>
  </div>
</template>

<script>
import EventTestEvent1 from "./EventTestEvent1.vue";
import EventTestEvent2 from "./EventTestEvent2.vue";
export default {
  name: "EventTest",
  components: {
    EventTestEvent1,
    EventTestEvent2,
  },
  methods: {
    handlerClick(event) {
      console.log("原生DOM绑定事件", event);
    },
    handlerClick1(event) {
      console.log("event1事件回调", event);
    },
    handlerClick2(event) {
        console.log("handlerClick2", event);
    },
    handlerClick3(event) {
      console.log("event2事件回调", event);
    },
  },
};
</script>

<style>
</style>