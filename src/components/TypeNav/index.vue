<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="typenav-sort">
          <div class="sort" v-show="typeNavShow">
            <!-- 编程式导航+事件委派  实现路由跳转，传递参数 -->
            <div class="all-sort-list2" @click="goSearch" @mouseleave="leaveIndex">
              <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIndex == index }">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：将；lodash全部功能引入
// import _ from 'lodash';
// 最好的引入方式：按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      typeNavShow: true,
    };
  },
  methods: {
    // 鼠标进入，修改响应式数据currentIndex属性
    // changeIndex(index){
    //   // 鼠标移上第index个
    //   //正常情况.（用户慢慢的操作）﹔鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
    //   //非正常情况〈用户操作很快):本身全部的一级分类都应该触发固标进入事件，但是经过测试，只有部分h3触发了
    //   //就是由于用户行为过快，导致浏览器反应不过来.如果当前回调函数中有一些大量业务，有可能出现卡顿现象..
    //   this.currentIndex = index
    // },
    // throttle(节流)回调函数别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 20),
    leaveIndex() {
      this.currentIndex = -1;
    },
    //最好的解决方案:编程式导航+事件委派
    goSearch(event) {
      //利用事件委派存在一些问题: 
      // 1:点击一定是a标签? ————将子节点a标签加上自定义属性data-categoryName，其他属性没有
      // 2:如何获取参数【1、2、3级分类的产品的名,id】————
      let element = event.target;
      // 获取到当前出发这个事件的节点【h3、a、dt、 d1】，带有data-categoryname这样的节点【一定是a标签】
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = element.dataset; // dataset获取的值都是小写
      if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 如果路由跳转的时候，带有params参数，捎带传递过去
        location.params = this.$route.params
        location.query = query
        this.$router.push(location)
      }
    },
    // 当鼠标移入的时候,让商品分类列表进行展示
    enterShow() {
      this.typeNavShow = true;
    },
    leaveShow() {
      if (this.$route.path != '/home') {
        this.typeNavShow = false;
      }
    }
  },
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    //当组件挂载完毕,让show展性变为false//如果不是Home铬由组件,将typeNav进行隐藏
    if (this.$route.path != '/home') {
      this.typeNavShow = false;
    }
  },
  computed: {
    // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    // 注入一个参数state,其实即为大仓库中的数据
    ...mapState({
      categoryList: (state) => state.home.categoryList,
      /* categoryList:(state)=>{
          return state.home.categoryList;
        } */
    }),
  },
};
</script>

<style scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
}

.type-nav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}

.type-nav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.type-nav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}

.type-nav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}

.type-nav .container .sort .all-sort-list2 .cur {
  background: skyblue;
}

.type-nav .container .sort .all-sort-list2 .item h3 {
  line-height: 27px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}

.type-nav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
  cursor: pointer;
}

.type-nav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dt a {
  cursor: pointer;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}

.type-nav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em a {
  cursor: pointer;
}

/* 过渡动画sort */
.typenav-sort-enter-from,.typenav-sort-leave-to{
  height: 0px;
  opacity: 0;
}
.typenav-sort-enter-to,.typenav-sort-leave-from{
  height: 461px;
  opacity: 1;
}
.typenav-sort-enter-active,.typenav-sort-leave-active{
  transition: all .5s linear;
  transition: opacity 0.5s ease;
}

</style>