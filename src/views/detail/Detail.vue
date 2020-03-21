<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="goodsParam"/>
    </scroll>
  </div>
</template>

<script>

  import DetailNavBar from "./childComp/DetailNavBar"
  import DetailSwiper from "./childComp/DetailSwiper"
  import DetailBaseInfo from "./childComp/DetailBaseInfo"
  import DetailShopInfo from "./childComp/DetailShopInfo"
  import DetailGoodsInfo from "./childComp/DetailGoodsInfo"
  import DetailParamInfo from "./childComp/DetailParamInfo"

  import Scroll from "components/context/scroll/Scroll"

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        goodsParam: {},
        detailInfo: {}
      }
    },
    created() {
      this.iid = this.$route.params.iid;
      getDetail(this.iid).then(res => {
        const data = res.data;
        console.log(data);
        this.topImages = data.result.itemInfo.topImages
        this.goods = new Goods(data.result.itemInfo, data.result.columns, data.result.shopInfo.services)
        this.shop = new Shop(data.result.shopInfo);
        this.goodsParam = new GoodsParam(data.result.itemParams.info, data.result.itemParams.rule)
        this.detailInfo = data.result.detailInfo;
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
