<template>
  <div id="video_card">
    <div class="video_poster">
      <VanImage class="poster_image" :src="cardData.worksIconUrl" fit="cover" />
    </div>
    <div class="video_publisher">
      <!--      <svg-icon icon-class="like" style="color: yellow;" />-->
      <VanImage class="avator_image" :src="cardData.vipPic" fit="cover" />
      <p class="publisher f14">{{ cardData.vipName }}</p>
    </div>
    <svg-icon icon-class="play" class="play_icon" @click="playVideo" />
    <div class="video_desc">{{ cardData.worksTitle }}</div>
  </div>
</template>

<script>
export default {
  name: 'VideoCard',
  components: {},
  props: {
    cardData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      player: null,
      loading: true
    }
  },
  mounted() {
    const source = this.cardData.videoSrc
    const cover = this.cardData.poster
  },
  methods: {
    getStyle(ele) {
      var style = null
      if (window.getComputedStyle) {
        style = window.getComputedStyle(ele, null)
      } else {
        style = ele.currentStyle
      }
      return style
    },
    playVideo() {
      // this.$emit('getPlayUrl', this.cardData.videoSrc)
      // this.$store.dispatch('player/SetPlayUrl', this.cardData.videoSrc)
      this.$router.push({
        name: 'Video',
        params: {
          playUrl: this.cardData.videoSrc
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/*/deep/.video-js .vjs-tech {
  object-fit: cover;
}*/
#video_card {
  position: relative;
  height: 193px;
  .video_poster {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;

    .poster_image {
      width: 100%;
      height: 100%;

      /deep/.van-image__img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .video_publisher {
    position: absolute;
    top: 9px;
    left: 16px;
    z-index: 99;
    @include flexbox($jc: flex-start);
    .avator_image {
      width: 21px;
      height: 21px;
      margin-right: 8px;
      border-radius: 50%;

      /deep/.van-image__img {
        border-radius: 50%;
      }
    }
    .publisher {
      width: 100px;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      @include textoverflow();
    }
  }

  .play_icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    margin: auto;
    font-size: 100px;
    color: #fff;
  }

  .video_desc {
    position: absolute;
    right: 0;
    bottom: 16px;
    left: 0;
    z-index: 99;
    width: calc(100% - 30px);
    margin: 0 auto;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;
    text-align: center;
    @include textoverflow();
  }

  @media screen and (min-width: 769px) {
    .video_desc {
      //width: 10rem;
    }
  }
}

/deep/.van-skeleton__avatar {
  margin-top: 8px;
}
</style>
