<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/image/tabbar/home.svg">
        <img slot="item-icon-active" src="~assets/image/tabbar/home_active.svg">
        <div slot="item-name">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/image/tabbar/category.svg">
        <img slot="item-icon-active" src="~assets/image/tabbar/category_active.svg">
        <div slot="item-name">分类</div>
      </tab-bar-item>
      <tab-bar-item path="shopcart">
        <img slot="item-icon" src="~assets/image/tabbar/shopcart.svg">
        <img slot="item-icon-active" src="~assets/image/tabbar/shopcart_active.svg">
        <div slot="item-name">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img slot="item-icon" src="~assets/image/tabbar/profile.svg">
        <img slot="item-icon-active" src="~assets/image/tabbar/profile_active.svg">
        <div slot="item-name">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar"
  import TabBarItem from "components/common/tabbar/TabBarItem"

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
