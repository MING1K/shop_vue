<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!username">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <span>{{ username }}</span>
            <span class="register" @click="handleLogout">退出登录</span>
          </p>
        </div>
        <div class="typeList">
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/center">我的订单</router-link>
          <!-- <a href="###">我的购物车</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="@/assets/images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Header",
  data() {
    return {
      keyword: '',
    }
  },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clearKeyWord', () => {
      this.keyword = '';
    });
  },
  computed: {
    ...mapGetters('user', ['username']),
  },
  methods: {
    // 搜索按钮的回调函数
    goSearch() {
      // 路由传参
      // 第一种：字符串形式
      // this.$router.push('/search/'+this.keyword+"?k="+this.keyword.toUpperCase())
      // 第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 第三种：对象写法（常用）
      // this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
      /* ************************************* */

      // 1. 路由传递参数(对象写法）path是否可以结合params参数一起使用?
      // 答：路由传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用
      // this.$router.push({path:"/search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}}) // params传递参数无效

      // 2. 如何指定params参数可传可不传?
      // 如果路由要求传递params参数，但没有传递params参数，URL会出现问题
      // 期望：http://localhost:8080/#/search?k=ABC
      // 实际：http://localhost:8080/#/?k=ABC
      // 如何指定params参数可传可不传：可以在配置路由时，在占位的后面加上一个问号【代表params参数可传可不传】
      // this.$router.push({name:"search",query:{k:this.keyword.toUpperCase()}})

      // 3. params参数可以传递也可以不传递，但是如果传递是空串，如何解决?
      // 使用undefined解决：params参数可以传递、不传递（空的字符串)
      // this.$router.push({name:"search",params:{keyword:this.keyword || undefined},query:{k:this.keyword.toUpperCase()}})

      // 4. 路由组件能不能传递props数据?
      // 可以的：三种写法

      // 治标
      // this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{});
      // 治本（在路由中创建Vuerouter实例）
      let location = { name: "search", params: { keyword: this.keyword || undefined } }
      location.query = this.$route.query
      this.$router.push(location);
    },
    // 退出登录
    async handleLogout() {
      //退出登录需要做的事情
      //1:需要发请求，通知服务器退出登录[清除一些数据:token]
      //2:清除项目当中的数据[userInfo、token]
      try {
        await this.$store.dispatch('user/userLogout');
        // 回到首页
        this.$router.push('/home');
      } catch (error) {
        this.$message.error(error);
      }
    }
  }
}
</script>

<style lang="css" scoped>
.header>.top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}

.header>.top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.header>.top .container .loginList {
  float: left;
}

.header>.top .container .loginList p {
  float: left;
  margin-right: 10px;
}

.header>.top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}

.header>.top .container .typeList {
  float: right;
}

.header>.top .container .typeList a {
  padding: 0 10px;
}

.header>.top .container .typeList a+a {
  border-left: 1px solid #b3aeae;
}

.header>.bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.header>.bottom .logoArea {
  float: left;
}

.header>.bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}

.header>.bottom .searchArea {
  float: right;
  margin-top: 35px;
}

.header>.bottom .searchArea .searchForm {
  overflow: hidden;
}

.header>.bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}

.header>.bottom .searchArea .searchForm input:focus {
  outline: none;
}

.header>.bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}

.header>.bottom .searchArea .searchForm button:focus {
  outline: none;
}</style>