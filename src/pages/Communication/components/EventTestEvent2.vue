<template>
    <div class="event">
      <h1>Event2</h1>
      <button @click="$emit('click', '自定义事件click')">分发自定义click事件</button><br/>
      <button @click="$emit('xxx', '自定义事件')">分发自定义xxx事件</button>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style scoped>
  .event {
      background-color: grey;
      height: 200px;
  }
  </style>