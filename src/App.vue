<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在login、register隐藏 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.footershow"></Footer>

  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    // 派发一个action ||获取商品分类的三级列表的数据
    // 通知vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch("home/categoryList");
  }
}
</script>

<style scoped>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
