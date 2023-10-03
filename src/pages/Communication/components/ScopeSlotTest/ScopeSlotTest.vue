
import { toFormData } from 'axios';

import { toFormData } from 'axios';
<template>
  <div>
    <h2>效果一：显示todo列表时，已完成的todo为绿色</h2>
    <!-- 子组件：数据来自父组件 -->
    <todo-list :todos="todos">
        <!-- 子组件决定不了结构与外观 -->
        <template slot-scope="todo">
            <span :style="{color: todo.todo.isComplete ? 'green' : 'red' }">{{ todo.todo.text }}</span>
        </template>
    </todo-list>
    <hr>
    <h2>效果二：显示todo列表，带序号，Todo颜色为蓝绿搭配</h2>
    <todo-list-1 :todos="todos">
        <template slot-scope="{todo, index}">
            <!-- {{ todo }} -->
            <span :style="{color: todo.isComplete ? 'green' : 'red' }">{{ index + '------' + todo.text }}</span>
        </template>
    </todo-list-1>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import TodoList1 from "./TodoList1.vue";
export default {
  components: { TodoList, TodoList1 },
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: false },
        { id: 4, text: "DDD", isComplete: false },
      ],
    };
  },
};
</script>

<style></style>