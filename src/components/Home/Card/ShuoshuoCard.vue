<template>
  <div class="shuoshuo_wrap" @click.stop="toShuoshuo">
    <div class="shuoshuo_top">
      <img
        class="shuoshuo_top_userava"
        :src="cardData.vipPic"
        @click.stop="toUserCenter"
      />
      <div class="shuoshuo_top_username">
        <span class="username">{{ cardData.vipName }}</span>

        <span class="publish_time f14">{{getTime( cardData.createTime) }}</span>
      </div>
    </div>
    <div class="shuoshuo_content f16">
      <span>{{ content }}</span>
      <span
v-if="cardData.worksTitle.length > 100"
class="to_shuoshuo"
        >...全部</span
      >
    </div>
    <div class="shuoshuo_images ig-shuoshuo_images">
      <div
        class="shuoshuo_image_wrap"
        v-for="(item, index) in imgList"
        :key="index"
        @click.stop="preview(index)"
      >
        <van-image class="shuoshuo_img_item" fit="cover" :src="item" />
      </div>
    </div>
    <div class="shuoshuo_bottom">
      <!-- <svg-icon icon-class="forward" class="forward_icon"></svg-icon>
      <span class="forward">转发</span>
      <svg-icon
        icon-class="like"
        class="star_icon"
        :class="{ is_star: isStar }"
        @click="starItem"
      ></svg-icon> -->
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { getStyle } from '@/utils'
import { getDateDiff } from '../../../utils/timeuitl'
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
    imgList() {
      const imgs = this.cardData.worksIconUrl
        ? this.cardData.worksIconUrl.split(',')
        : []
      this.imgs = imgs
      if (imgs.length > 0) {
        return imgs.filter((item, index) => index < 3)
      } else {
        return []
      }
    },
    content() {
      return this.cardData.worksTitle.substr(0, 100)
    }
  },
  data() {
    return {
      isOpen: false,
      previewList: [],
      index: 0,
      final: '',
      isShowAll: true,
      imgs: [] // 说说全部图片列表
    }
  },
  mounted() {
  },
  methods: {
    getTime: function(time) {
      return getDateDiff(time)
    },
    init() {
    },
    toShuoshuo() {
      this.$router.push({
        name: 'Shuoshuo',
        params: {
          id: this.cardData.id
        }
      })
    },
    starItem() {
      this.isStar = !this.isStar
    },
    setEllipsis() {
      const rootSize = parseFloat(
        document.querySelector('html').style.fontSize
      )
      const height = rootSize * 2
      const content = this.cardData.content
      let str = ''
      const _this = this
      function loop(i) {
        str = content.substr(0, i)
        _this.final = str
        const arr = _this.final.split('')
        if (
          parseFloat(
            getStyle(document.querySelector('.' + _this.dataClass)).height
          ) < height &&
          i < content.length + 1
        ) {
          i++
          _this.$nextTick(() => {
            loop(i)
          })
        } else if (
          parseFloat(
            getStyle(document.querySelector('.' + _this.dataClass)).height
          ) > height
        ) {
          _this.$nextTick(() => {
            arr.splice(-2, 2)
            _this.final = arr.join('')
          })
        } else if (i === content.length + 1) {
          _this.isShowAll = false
        }
      }
      loop(1)
    },
    preview(index) {
      wx.previewImage({
        current: this.imgList[index] + '?v=' + new Date().getTime(),
        urls: this.imgList
      })
    },
    toUserCenter() {
      this.$router.push({
        name: 'PersonalHomepage',
        query: {
          userId: this.cardData.vipId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shuoshuo_wrap {
  position: relative;
  width: 100%;
  padding: 17px 15px 15px;
  box-sizing: border-box;

  .shuoshuo_top {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;

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
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
        color: #222222;
      }

      .publish_time {
        height: 14px;
        line-height: 14px;
        color: #999999;
        transform: scale(0.83);
        transform-origin: 0;
      }
    }
  }

  .shuoshuo_content {
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    //height: 75px;
    color: #222222;
    text-align: left;
    white-space: pre-wrap;
    word-break: break-all;

    .to_shuoshuo {
      font-size: 16px;
      color: #1792e9;
    }
  }

  .shuoshuo_images {
    max-width: 100%;
    overflow: hidden;
    font-size: 0;
    line-height: 0;

    .shuoshuo_image_wrap {
      display: inline-block;
      width: calc(100% / 3);
      padding: 0 8px 8px 0;
      box-sizing: border-box;

      .shuoshuo_img_item {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background: #d8d8d8;

        /deep/img {
          position: absolute;
        }
      }
    }

    /* .shuoshuo_img_item:nth-of-type(3n + 2) {
      margin: 0 7px;
    }*/
  }

  @media screen and (min-width: 769px) {
    .ig-shuoshuo_images {
      max-width: 400px;
    }
  }

  .shuoshuo_bottom {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .forward {
      margin: 0 18px 0 8px;
      font-size: 12px;
      color: #999999;
    }
    .forward_icon,
    .star_icon {
      font-size: 24px;
      color: #c5c4c4;
    }
    .star_icon {
      position: relative;
      top: 0;
      font-size: 30px;
    }
    .is_star {
      color: #fc4b63;
    }
  }
}
</style>
