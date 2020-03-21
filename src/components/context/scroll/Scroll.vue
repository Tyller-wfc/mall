<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BetterScroll from "better-scroll"

  export default {
    name: "Scroll",
    components: {
      BetterScroll
    },
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: true,
        click: true
      })
      this.scroll.on('scroll', position => {
        this.$emit("scroll", position)
      });
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      backTop(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time);
      }
    }
  }
</script>

<style scoped>

</style>
