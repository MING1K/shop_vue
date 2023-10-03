<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(tab, index) in list.navList"
              :key="index"
            >
              <a :href="tab.url" data-toggle="tab">{{ tab.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in list.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img v-lazy="list.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- 全局组件 -->
              <Carousel :list="list.carouselList"></Carousel>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img v-lazy="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img v-lazy="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img v-lazy="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img v-lazy="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img v-lazy="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
export default {
  name: "FloorContain",
  props: ["list"],
  // 组件挂载完毕
  mounted() {
    //第一次书写Swiper的时候:在mounted当中书写是不可以的，但是为什么现在这里可以啦!
    //第一次书写轮播图的时候，是在当前组件内部发请求、动态渲染解构【前台至少服务器数据需要回来】，因此当年的写法在这里不行
    //现在的这种写法为什么可以:因为请求是父组件发的，父组件通过props传递过来的，而且结构都已经有了的情况下执行mounted
    // var mySwiper = new Swiper(this.$refs.cur, {
    //   loop: true, // 循环模式选项
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true, // 点击分页器控制切换
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
  },
//   watch: {
//     list: {
//       // 立即监听
//       immediate: true,
//       handler() {
//         //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
//         this.$nextTick(()=>{
//           // 在下次DOM更新 （数据更新）循环结束之后（v-for循环结束）执行延迟回调。在修改数据之后（得到服务器数据）立即使用这个方法，获取更新后的 DOM。
//           var mySwiper = new Swiper(this.$refs.cur,{
//             loop: true, // 循环模式选项
//             // 如果需要分页器
//             pagination: {
//               el: '.swiper-pagination',
//               clickable: true, // 点击分页器控制切换
//             },
//             // 如果需要前进后退按钮
//             navigation: {
//               nextEl: '.swiper-button-next',
//               prevEl: '.swiper-button-prev',
//             },
//           })
//         })
//       },
//     },
//   },
};
</script>

<style scoped>
.floor {
  margin-top: 15px;
}
.floor .py-container {
  width: 1200px;
  margin: 0 auto;
}
.floor .py-container .title .fl {
  float: left;
  color: #c81623;
  font-size: 20px;
  line-height: 30px;
  margin: 9px 0;
  font-weight: 700;
}
.floor .py-container .title .fr {
  float: right;
}
.floor .py-container .title .fr .nav-tabs {
  margin: 10px 0 0;
  display: inline-block;
}
.floor .py-container .title .fr .nav-tabs li {
  float: left;
  line-height: 18px;
}
.floor .py-container .title .fr .nav-tabs li a {
  padding-top: 1px;
  font-weight: 400;
  background-color: #fff;
}
.floor .py-container .title .fr .nav-tabs li a::after {
  content: "|";
  padding: 0 10px;
}
.floor .py-container .title .fr .nav-tabs li:nth-child(7) a::after {
  content: "";
}
.floor .py-container .title .fr .nav-tabs li.active a {
  color: #e1251b;
}
.floor .py-container .tab-content {
  border-top: 2px solid #c81623;
  border-bottom: 1px solid #e4e4e4;
}
.floor .py-container .tab-content .tab-pane .floor-1 {
  height: 360px;
  display: flex;
}
.floor .py-container .tab-content .tab-pane .floor-1 .blockgary {
  width: 210px;
  height: 100%;
  background: #f7f7f7;
}
.floor .py-container .tab-content .tab-pane .floor-1 .blockgary .jd-list {
  padding: 15px 0;
  overflow: hidden;
}
.floor .py-container .tab-content .tab-pane .floor-1 .blockgary .jd-list li {
  list-style-type: none;
  float: left;
  width: 40%;
  margin: 0 10px;
  border-bottom: 1px solid #e4e4e4;
  text-align: center;
  line-height: 26px;
}
.floor .py-container .tab-content .tab-pane .floor-1 .blockgary img {
  width: 100%;
}
.floor .py-container .tab-content .tab-pane .floor-1 .floorBanner {
  width: 330px;
  height: 100%;
}
.floor .py-container .tab-content .tab-pane .floor-1 .split {
  width: 220px;
  height: 100%;
  position: relative;
}
.floor .py-container .tab-content .tab-pane .floor-1 .split .floor-x-line {
  position: absolute;
  background: #e4e4e4;
  width: 220px;
  height: 1px;
  top: 180px;
}
.floor .py-container .tab-content .tab-pane .floor-1 .split .floor-conver-pit {
  width: 100%;
  height: 50%;
}
.floor
  .py-container
  .tab-content
  .tab-pane
  .floor-1
  .split
  .floor-conver-pit
  img {
  width: 100%;
  height: 100%;
  transition: all 400ms;
}
.floor
  .py-container
  .tab-content
  .tab-pane
  .floor-1
  .split
  .floor-conver-pit
  img:hover {
  opacity: 0.8;
}
.floor .py-container .tab-content .tab-pane .floor-1 .center {
  border: 1px solid #e4e4e4;
}
</style>