<template>
  <van-popup
    v-model="show"
    id="publish_wrap"
    position="bottom"
    @click-overlay="clickOverlay"
    @open="open"
  >
    <div class="publish_inner">
      <div class="publish_article publish_item">
        <svg-icon icon-class="article" class="publish_icon"></svg-icon>
        <span>文章</span>
      </div>
      <div class="publish_video publish_item">
        <svg-icon icon-class="video" class="publish_icon"></svg-icon>
        <span>视频</span>
      </div>
      <div class="publish_shuoshuo publish_item">
        <svg-icon icon-class="shuoshuo" class="publish_icon"></svg-icon>
        <span>说说</span>
      </div>
    </div>
    <svg-icon
      icon-class="close"
      class="close_icon"
      @click="clickOverlay"
      v-show="isShowIcon"
    ></svg-icon>
  </van-popup>
</template>

<script>
export default {
  name: 'Publish',
  components: {},
  data() {
    return {
      showPublish: false,
      publishData: [
        {
          type: 'article',
          to: 'Article',
          icon: 'article',
          title: '文章'
        },
        {
          type: 'video',
          to: 'Video',
          icon: 'video',
          title: '视频'
        }
      ],
      isShowIcon: false
    }
  },
  watch: {
    test() {}
  },
  computed: {
    show: {
      get() {
        return this.$store.state.app.showPublishWrap
      },
      set(val) {
        this.$store.dispatch('app/setShowPublishWrap', false)
      }
    }
  },
  mounted() {},
  methods: {
    clickOverlay() {
      this.isShowIcon = false
      this.$store.dispatch('app/setShowPublishWrap', false)
    },
    open() {
      setTimeout(() => {
        this.isShowIcon = true
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
#publish_wrap {
  bottom: 80px;
  background-color: transparent !important;

  .publish_inner {
    display: flex;
    width: 100%;
    background-color: transparent;
    justify-content: space-around;
    align-items: center;

    .publish_item {
      display: flex;
      width: 30%;
      height: 90px;
      padding: 13px;
      background-color: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      .publish_icon {
        margin-bottom: 10px;
        font-size: 42px;
      }
    }
  }
  .close_icon {
    position: fixed;
    bottom: 30px;
    left: 50%;
    display: none;
    font-size: 30px;
    color: #fff;
    transform: translateX(-50%);
  }
}
</style>
