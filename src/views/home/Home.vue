<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComp/HomeSwiper";
  import RecommendView from "./childComp/RecommendView"
  import FeatureView from "./childComp/FeatureView"

  import {getHomeMultiData} from 'network/home';

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        dKeywords: [],
        keywords: [],
        recommends: []
      }
    },
    created() {
      getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list;
        this.dKeywords = res.data.data.dKeyword.list;
        this.keywords = res.data.data.keywords.list;
        this.recommends = res.data.data.recommend.list;
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
