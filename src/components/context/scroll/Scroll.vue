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
    props() {
      return {
        probeType: {
          type: Number,
          default: 0
        }
      }
    },
    mounted() {
      this.scroll = new BetterScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: true
      })
      this.scroll.on('scroll', position => {
        this.$emit("scroll",position)
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
