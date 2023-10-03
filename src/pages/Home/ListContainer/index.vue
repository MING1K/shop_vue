<template>
        <!--列表-->
        <div class="list-container">
            <div class="sortList clearfix">
                <SwiperBanner></SwiperBanner>
                <NewsList></NewsList>
            </div>
        </div>
</template>

<script>
import SwiperBanner from './SwiperBanner'
import NewsList from './NewsList';
export default {
    name:'ListContainer',
    components:{SwiperBanner,NewsList},
}
</script>

<style scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;
}
.list-container .sortList {
  height: 464px;
  padding-left: 210px;
}
</style>