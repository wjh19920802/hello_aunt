<template>
  <div id="shuoshuo_wrap">
    <div class="shuoshuo_top">
      <img class="shuoshuo_top_userava" :src="cardData.avator" />
      <div class="shuoshuo_top_username">
        <span class="username f16">{{ cardData.author }}</span>
        <span class="publish_time">{{ cardData.publishTime }}</span>
      </div>

      <div class="delete_content">
        <img :src="bottom" @click="showDelete" />
        <div
          class="delete_ctl"
          v-if="isDelete"
          @click="deleteData(cardData.id)"
        >
          删除
        </div>
      </div>
    </div>
    <div class="shuoshuo_content f16" :class="{ 'text-overflow': !isOpen }">
      {{ cardData.content }}
    </div>
    <div class="video_card">
      <div class="video_poster">
        <VanImage class="poster_image" :src="cardData.poster" fit="cover" />
      </div>
      <div class="video_publisher">
        <!--      <svg-icon icon-class="like" style="color: yellow;" />-->
        <!-- <VanImage class="avator_image" :src="cardData.avator" fit="cover" />
        <p class="publisher">{{ cardData.author }}</p> -->
      </div>
      <svg-icon icon-class="play" class="play_icon" @click="playVideo" />
      <!-- <div class="video_desc">{{ cardData.overview }}</div> -->
    </div>
    <div class="shuoshuo_bottom">
      <svg-icon
        icon-class="forward"
        :class="{ is_star: isForward }"
        @click="starForward"
        class="forward_icon"
      ></svg-icon>
      <span class="forward">转发</span>
      <svg-icon
        icon-class="like"
        class="star_icon"
        :class="{ is_star: isStar }"
        @click="starLike"
      ></svg-icon>
      <span class="forward">401</span>
      <svg-icon
        icon-class="privateletter"
        class="star_icon"
        :class="{ is_star: isComment }"
        @click="starComment"
      ></svg-icon>
      <span class="forward">401</span>
    </div>
  </div>
</template>

<script>
import bottom from '../../assets/imgs/bottom.png'
import { Dialog } from 'vant'
import Vue from 'vue'
Vue.use(Dialog)
export default {
  name: 'ShuoshuoCard',
  props: {
    cardData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    isStar: {
      set(val) {
        this.cardData.isStar = val
      },
      get() {
        return this.cardData.isStar
      }
    },
    isComment: {
      set(val) {
        this.cardData.isComment = val
      },
      get() {
        return this.cardData.isComment
      }
    },
    isForward: {
      set(val) {
        this.cardData.isForward = val
      },
      get() {
        return this.cardData.isForward
      }
    }
  },
  data() {
    return {
      bottom,
      isOpen: false,
      isDelete: false,
      player: null,
      loading: true
    }
  },
  mounted() {
    const source = this.cardData.videoSrc
    const cover = this.cardData.poster
  },
  methods: {
    openOrFold() {
      this.isOpen = !this.isOpen
    },
    starLike() {
      this.isStar = !this.isStar
    },
    starForward() {
      this.isForward = !this.isForward
    },
    starComment() {
      this.isComment = !this.isComment
    },
    showDelete() {
      this.isDelete = true
    },
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
      this.$store.dispatch('player/SetPlayUrl', this.cardData.videoSrc)
    },
    deleteData(item) {
      const _that = this
      Dialog.alert({
        message: '确定删除这条说说吗？',
        confirmButtonColor: '#1452F5',
        showCancelButton: true
      }).then(() => {
        _that.$emit('deleteItem', item)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#shuoshuo_wrap {
  position: relative;
  width: 100%;
  padding: 17px 15px 15px;
  box-sizing: border-box;

  .shuoshuo_top {
    position: relative;
    display: flex;
    margin-bottom: 10px;
    justify-content: flex-start;
    .delete_content {
      position: absolute;
      top: 9px;
      right: 0px;
      img {
        width: 13px;
        height: 7px;
      }
      .delete_ctl {
        position: absolute;
        top: 16px;
        right: 0px;
        width: 45px;
        height: 21px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 12px;
        font-weight: 400;
        line-height: 21px;
        color: #ffffff;
        text-align: center;
        background: #000000;
        border-radius: 5px;
        opacity: 0.69;
        &:active {
          opacity: 0.89;
        }
      }
    }

    .shuoshuo_top_userava {
      width: 36px;
      height: 36px;
      margin-right: 10px;
      border-radius: 50%;
    }

    .shuoshuo_top_username {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .username {
        height: 20px;
        font-weight: 600;
        line-height: 20px;
        color: #222222;
      }

      .publish_time {
        height: 14px;
        font-size: 12px;
        line-height: 14px;
        color: #999999;
        text-align: left;
        transform: scale(0.83);
        transform-origin: 0;
      }
    }
  }

  .shuoshuo_content {
    position: relative;
    width: 100%;
    line-height: 19px;
    color: #222222;
    text-align: left;
  }

  .open_fold {
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 19px;
    color: #1792e9;
    text-align: right;
  }

  .text-overflow {
    @include textoverflow(2);
  }
  .article_content {
    display: flex;
    width: 100%;
    margin: 11px auto;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    align-items: center;
    img {
      width: 135px;
      height: 75px;
      border-radius: 12px 0px 0px 12px;
      object-fit: none;
    }
    div {
      padding: 15px 16px;
      box-sizing: border-box;
      flex: 1;
      p {
        width: 100%;
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 12px;
        font-weight: 500;
        line-height: 17px;
        color: #222222;
        text-align: left;
      }
      .author {
        display: flex;
        padding: 0px;
        margin-top: 8px;
        text-align: left;
        justify-content: flex-start;
        img {
          width: 18px;
          height: 18px;
          margin-right: 9px;
          border-radius: 50%;
        }
        p {
          width: 150px;
          height: 18px;
          overflow: hidden;
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 11px;
          font-weight: 500;
          line-height: 18px;
          color: #999999;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .shuoshuo_images {
    display: flex;
    margin-bottom: 12px;
    flex-wrap: wrap;

    .shuoshuo_img_item {
      width: 110px;
      height: 110px;
      margin-bottom: 8px;
      background: #d8d8d8;
    }

    .shuoshuo_img_item:nth-of-type(3n + 2) {
      margin: 0 7px;
    }
  }

  .shuoshuo_bottom {
    display: flex;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(199, 199, 199, .3);
    justify-content: flex-start;
    align-items: center;

    .forward {
      margin: 0 18px 0 8px;
      font-size: 12px;
      color: #999999;
      vertical-align: top;
    }
    .forward_icon,
    .star_icon {
      font-size: 32px;
      color: #c5c4c4;
      visibility: top;
    }
    .star_icon {
      position: relative;
      top: 2px;
    }
    .is_star {
      color: #fc4b63;
    }
  }

  .video_card {
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
        font-weight: 600;
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
      width: 290px;
      margin: 0 auto;
      font-size: 12px;
      line-height: 17px;
      color: #ffffff;
      @include textoverflow();
    }
  }
}
</style>
