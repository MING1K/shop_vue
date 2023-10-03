<template>
  <div>
    <!-- 三级联动组件 -->
    <!-- 全局组件不需要再次引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <RecommendToday></RecommendToday>
    <GoodsRank></GoodsRank>
    <GuessLike></GuessLike>
    <!-- FloorContain组件内部没有发请求，数据是父组件给的 -->
    <FloorContain
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></FloorContain>
    <BrandIcon></BrandIcon>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import RecommendToday from "./RecommendToday";
import GoodsRank from "./GoodsRank";
import GuessLike from "./GuessLike";
import FloorContain from "./FloorContain";
import BrandIcon from "./BrandIcon";
import { mapState, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    RecommendToday,
    GoodsRank,
    GuessLike,
    FloorContain,
    BrandIcon,
  },
  mounted() {
    // 获取floor组件数据
    this.$store.dispatch("home/getFloorList");
    // this.getUserInfo();
  },
  computed: {
    ...mapState("home", ["floorList"]),
    // ...mapGetters('user', ['userInfo']),
  },
  methods: {
    // async getUserInfo() {
    //   try {
    //     await this.$store.dispatch("user/getUserInfo");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>

<style>
</style>