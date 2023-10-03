<template>
    <div>
      <ul>
        <li v-for="(todo, index) in todos" :key="todo.id">
          <!-- 作用域插槽 -->
          <slot :todo="todo" :index="index"></slot>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todos: {
        type: Array,
        default: function () {
          return [];
        },
      },
    },
  };
  </script>
  
  <style>
  </style>