<template>
  <!--banner轮播-->
  <div class="swiper-container" ref="mySwiper" id="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    // 监听BannerList数据的变化：有空数组变为有元素
    bannerList: {
      immediate: true,
      handler(newValue, oldValue) {
        //如果执行handler方法，代表组件实例身上这个属性的属性以已经有了【数组:四个元素】
        //当前这个函数执行:只能保证bannerList数据已经有了，但是你没办法保证v-for已经执行结束
        //v-for执行完毕,才有结构【你现在在watch当中没办法保证的】
        this.$nextTick(() => {
          // 在下次DOM更新 （数据更新）循环结束之后（v-for循环结束）执行延迟回调。在修改数据之后（得到服务器数据）立即使用这个方法，获取更新后的 DOM。
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 点击分页器控制切换
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped>
</style>