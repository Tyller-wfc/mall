<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']" class="tab-control"
                 @tabClick="tabClick" v-show="isTabControlFixed" ref="tabControl_2"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl_1"></tab-control>
      <goods-list :goods="currentGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/context/tabcontrol/TabControl";
  import GoodsList from "components/context/goods/GoodsList";
  import Scroll from "components/context/scroll/Scroll"
  import BackTop from "components/context/backtop/BackTop"

  import HomeSwiper from "./childComp/HomeSwiper";
  import RecommendView from "./childComp/RecommendView"
  import FeatureView from "./childComp/FeatureView"


  import {getHomeMultiData, getHomeGoods} from 'network/home';
  import {debounce} from "common/util";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    data() {
      return {
        banners: [],
        dKeywords: [],
        keywords: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        isTabControlFixed: false,
        tabOffsetTop:0,
        positionY:0
      }
    },
    created() {
      this.getHomeMultiData();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 50);
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      });
    },
    computed: {
      currentGoods() {
        return this.goods[this.currentType].list;
      }
    },
    activated(){
      this.$refs.scroll.scroll.scrollTo(0, this.positionY, 0);
      this.$refs.scroll.scroll.refresh();
    },
    deactivated(){
      this.positionY = this.$refs.scroll.getY();
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl_1.currentIndex = index;
        this.$refs.tabControl_2.currentIndex = index;
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl_1.$el.offsetTop;
      },
      backTop() {
        this.$refs.scroll.backTop(0, 0);
      },

      scroll(position) {
        this.isShowBackTop = -position.y > 1000;
        this.isTabControlFixed = -position.y > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.data.banner.list;
          this.dKeywords = res.data.data.dKeyword.list;
          this.keywords = res.data.data.keywords.list;
          this.recommends = res.data.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
