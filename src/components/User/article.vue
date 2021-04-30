<template>
  <div id="shuoshuo_wrap">
    <div class="shuoshuo_top" >
      <img class="shuoshuo_top_userava" :src="cardData.vipPic" @click="isDelete=false" />
      <div class="shuoshuo_top_username"   @click="isDelete=false" >
        <span class="username f16">{{ cardData.vipName }}</span>
        <span  v-if="cardData.worksAuditStatus === 1"   class="publish_time f14">{{
            getTime(cardData.createTime)
          }}</span>
        <span
class="status"
v-else
        >审核中</span
        >
      </div>
      <div class="delete_content" v-if="isShowDelete">
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
    <div
        class="shuoshuo_content f16"
        :class="{ 'text-overflow': !isOpen }"

        @click="toArticle"
    >
      {{ cardData.content }}
    </div>
    <div class="article_content f16"  @click="toArticle">
      <img :src="cardData.worksIconUrl" />
      <div>
        <p>{{ cardData.worksTitle }}</p>
        <div class="author">
          <img :src="cardData.vipPic" />
          <p>{{ cardData.vipName }}</p>
        </div>
      </div>
    </div>
    <div class="shuoshuo_bottom">
      <!-- <svg-icon
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
      <span class="forward">401</span> -->
    </div>
  </div>
</template>

<script>
import bottom from '../../assets/imgs/bottom.png'
import { getDateDiff } from '../../utils/timeuitl'
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
      isShowDelete: false
    }
  },
  mounted() {
    this.isShowDelete =
        this.cardData.vipId == this.$store.state.app.userInfo.id
  },
  methods: {
    getTime: function(time) {
      return getDateDiff(time)
    },
    toArticle() {
      this.$router.push({
        name: 'Article',
        params: {
          id: this.cardData.id
        },
        query: {
          type: this.isShowDelete ? '1' : ''
        }
      })
      this.isDelete = false
    },
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
      if (this.isDelete) {
        this.isDelete = false
      } else {
        this.isDelete = true
      }
    },

    deleteData(item) {
      const _that = this
      Dialog.alert({
        message: '确定删除这条文章吗？',
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
        font-size: 12px;
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
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 50%;
    }

    .shuoshuo_top_username {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 300px;
      .username {
        height: 23px;
        overflow: hidden;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        line-height: 23px;
        color: #222222;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 6px;
      }

      .publish_time {
        height: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 20px;
        color: #999999;
        text-align: left;
      }
      .status {
        height: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: #999999;
        text-align: left;
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
    justify-content: flex-start;
    align-items: center;
    white-space: pre-wrap;
    img {
      width: 135px;
      height: 98px;
      border-radius: 12px 0px 0px 12px;
      object-fit: cover;
    }

    div {
      padding: 15px 16px;
      box-sizing: border-box;
      flex: 1;
      p {
       
        width: 100%;
        overflow: hidden;
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 16px;
        font-weight: 700;
        line-height: 21px;
        color: #222222;
        text-align: left;
        text-overflow: ellipsis;
         display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /*截取2行*/
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
          object-fit: cover;
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
    border-bottom: 1px solid #f8f8f8;
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
}
</style>
