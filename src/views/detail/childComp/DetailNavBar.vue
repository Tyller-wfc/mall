<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" @click="goBack">
        <img src="~assets/image/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" v-for="(title,index) in titles"
             @click="itemClick(index)" :class="{active:currentIndex===index}">
          {{title}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex:0
      }
    },
    methods:{
      goBack(){
        this.$router.back();
        //this.currentIndex = 0;
      },
      itemClick(index){
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .detail-nav-bar{
    width: 100%;
  }
  .detail-nav-bar img{
    margin-top: 10px;
  }
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
