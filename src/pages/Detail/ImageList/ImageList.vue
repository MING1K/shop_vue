<template>
  <div class="swiper-container" ref="goodListSwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in skuImageList"
        :key="index"
        @click="handleChangeImg(index)"
      >
        <img v-lazy="img?.imgUrl" :class="{ active: imgNum === index }" />
      </div>
    </div>
    <div class="swiper-button-prev" @click="handlePre"></div>
    <div class="swiper-button-next" @click="handleNext"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: {
    skuImageList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    imgNum: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    skuImageList() {
      //保证数据发生修改,页面结构再次渲染完毕。在初始化Swiper实例
      this.$nextTick(() => {
        //初始化Swiper类的实例
        var mySwiper = new Swiper(this.$refs.goodListSwiper, {
          //设置轮播图防线
          direction: "horizontal",
          // loop:true,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //展示区域同时展示三张图片
          // slidesPerView: 'auto',
        });
      });
    },
  },
  methods: {
    handleChangeImg(index) {
      this.$emit("changeImgNum", index);
    },
    handlePre() {
      if (this.imgNum <= 0) this.$emit("changeImgNum", this.skuImageList.length - 1);
      else this.$emit("changeImgNum", this.imgNum - 1);
    },
    handleNext() {
      if (this.imgNum >= this.skuImageList.length - 1) this.$emit("changeImgNum", 0);
      else this.$emit("changeImgNum", this.imgNum + 1);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  user-select: none;
  height: 56px;
  width: 400px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>