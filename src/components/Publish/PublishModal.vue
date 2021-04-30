<template>
  <van-popup
    v-model="show"
    id="publish_wrap"
    position="bottom"
    duration="0.2"
    @click-overlay="clickOverlay"
    @open="open"
  >
    <div class="publish_inner">
      <div class="publish_article publish_item" @click="toPublishArticle">
        <svg-icon icon-class="article" class="publish_icon"></svg-icon>
        <span class="f16">文章</span>
      </div>
     <!-- <div class="publish_video publish_item">
        <svg-icon icon-class="video" class="publish_icon"></svg-icon>
        <span class="f16">视频</span>
      </div>-->
      <div class="publish_shuoshuo publish_item" @click="toPublishShuoshuo">
        <svg-icon icon-class="shuoshuo" class="publish_icon"></svg-icon>
        <span class="f16">说说</span>
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
    test() {},
    $route() {
      this.$store.dispatch('app/setShowPublishWrap', false)
    }
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
    },
    toPublishArticle() {
      this.$router.push({
        name: 'PublishArticle'
      })
    },
    toPublishShuoshuo() {
      this.$router.push({
        name: 'PublishShuoshuo'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#publish_wrap {
  z-index: 99999;
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
/deep/.van-overlay {
  z-index: 9999;
}
</style>
