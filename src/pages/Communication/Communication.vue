<template>
  <div>
    <h1>Communication</h1>
    <div class="list">
      <span v-for="(item, index) in menuList" :class="{selected: item.code === selected}" :key="item.code" @click="changeRoute(item.code)">{{ item.name }}</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Communication",
  data() {
    return {
        menuList: [
            { name: 'event深入', code: 'eventtest' },
            { name: 'v-model深入', code: 'vmodel' },
            { name: '属性修饰符sync', code: 'sync' },
            { name: '$attrs与$listeners', code: 'attrslisteners' },
            { name: '$children与$parent', code: 'childrenandparent' },
            { name: '插槽', code: 'slot' },

        ]
    };
  },
  computed: {
    selected() {
      return this.$route.name;
    },
  },
  methods: {
    changeRoute(code) {
        this.$router.push(`/communication/${code}`);
    },
  },
};
</script>

<style scoped>
.list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
}
span {
    width: auto;
    padding: 7px 10px;
    border: 1px solid #757575;
    border-radius: 5px;
}
.selected {
    color: red;
    border: 1px solid #ee3838;
}
</style>