<template>
  <div id="shuoshuo_wrap">
    <div class="shuoshuo_top">
      <img
        class="shuoshuo_top_userava"
        :src="cardData.vipPic"
        @click="isDelete = false"
      />
      <div class="shuoshuo_top_username" @click="isDelete = false">
        <span class="username f16">{{ cardData.vipName }}</span>
        <span v-if="cardData.worksAuditStatus === 1" class="publish_time f14">{{
          getTime(cardData.createTime)
        }}</span>
        <span class="status" v-else>审核中</span>
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
      @click="toShuoshuo"
    >
      <span>{{ content }}</span>
      <span v-if="cardData.worksTitle.length > 100" class="to_shuoshuo"
        >...全部</span
      >
    </div>
    <!-- <div class="open_fold" @click="openOrFold">
      {{ isOpen ? "收起" : "全文" }}
    </div> -->
    <div class="shuoshuo_images" @click="toShuoshuo">
      <van-image
        class="shuoshuo_img_item"
        fit="cover"
        v-for="(item, index) in cardData.imgs"
        :key="index"
        @click.stop="preview(index)"
        :src="item"
      />
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

    <van-image-preview
      v-model="showPreview"
      :images="cardData.imgs"
      :startPosition="startPosition"
      :closeable="true"
      get-container="body"
      @change="onChange"
    >
      <template v-slot:index
        >{{ index + 1 }} / {{ cardData.imgs.length }}</template
      >
    </van-image-preview>
  </div>
</template>

<script>
import bottom from "../../assets/imgs/bottom.png";
import { Dialog } from "vant";
import Vue from "vue";
import wx from 'weixin-js-sdk'
import { getDateDiff } from "../../utils/timeuitl";
Vue.use(Dialog);
export default {
  name: "ShuoshuoCard",
  props: {
    cardData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isStar: {
      set(val) {
        this.cardData.isStar = val;
      },
      get() {
        return this.cardData.isStar;
      },
    },
    isComment: {
      set(val) {
        this.cardData.isComment = val;
      },
      get() {
        return this.cardData.isComment;
      },
    },
    isForward: {
      set(val) {
        this.cardData.isForward = val;
      },
      get() {
        return this.cardData.isForward;
      },
    },
    content() {
      return this.cardData.worksTitle.substr(0, 100);
    },
  },
  data() {
    return {
      bottom,
      isOpen: false,
      isDelete: false,
      isShowDelete: false,
      showPreview: false,
      previewList: [],
      startPosition: 0,
      index: 0,
    };
  },
  mounted() {
    if (
      !(
        !this.cardData.worksIconUrl &&
        typeof this.cardData.worksIconUrl !== "undefined" &&
        this.cardData.worksIconUrl != 0
      )
    ) {
      this.$set(this.cardData, "imgs", this.cardData.worksIconUrl.split(","));
    }

    this.isShowDelete =
      this.cardData.vipId == this.$store.state.app.userInfo.id;
  },
  methods: {
    getTime: function (time) {
      return getDateDiff(time);
    },
    preview(index) {
      wx.previewImage({
        current: this.cardData.imgs[index] + "?v=" + new Date().getTime(),
        urls: this.cardData.imgs,
      });
    },
    // preview(index) {
    //   this.isDelete = false
    //   this.startPosition = index
    //   this.showPreview = true
    // },
    onChange(index) {
      this.index = index;
    },
    toShuoshuo() {
      this.isDelete=false;
      this.$router.push({
        name: "Shuoshuo",
        params: {
          id: this.cardData.id,
        },
        query: {
          type: this.isShowDelete ? "1" : "",
        },
      });
    },
    openOrFold() {
      this.isOpen = !this.isOpen;
    },
    starLike() {
      this.isStar = !this.isStar;
    },
    starForward() {
      this.isForward = !this.isForward;
    },
    starComment() {
      this.isComment = !this.isComment;
    },
    showDelete() {
      if (this.isDelete) {
        this.isDelete = false;
      } else {
        this.isDelete = true;
      }
    },
    deleteData(item) {
      const _that = this;
      Dialog.alert({
        message: "确定删除这条说说吗？",
        confirmButtonColor: "#1452F5",
        showCancelButton: true,
      }).then(() => {
        _that.$emit("deleteItem", item);
      });
    },
  },
};
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
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 23px;
        text-align: left;
        display: block;
        margin-top: 6px;
      }

      .publish_time {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        text-align: left;
        display: block;
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
    margin-bottom: 10px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    line-height: 23px;
    color: #222222;
    white-space: pre-wrap;
    word-break: break-all;

    text-align: left;
    .to_shuoshuo {
      font-size: 16px;
      color: #1792e9;
    }
  }

  .open_fold {
    margin-bottom: 10px;
    font-size: 13px;
    line-height: 19px;
    color: #1792e9;
    text-align: right;
  }

  .text-overflow {
    //@include textoverflow(2);
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
      object-fit: cover;
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

@media screen and (min-width: 769px) {
  .shuoshuo_images {
    display: flex;
    margin-bottom: 12px;
    flex-wrap: wrap;

    .shuoshuo_img_item {
      width: 110px;
      height: 110px;
      margin-bottom: 8px;
      background: #d8d8d8;
      object-fit: cover;
      &:nth-child(3n) {
        margin: 0px 7px;
        margin-left: 0px !important ;
      }
    }
    .shuoshuo_img_item:nth-of-type(3n + 2) {
      margin: 0 7px;
      margin-left: 0px !important;
    }
    .shuoshuo_img_item:nth-of-type(8n) {
      margin: 0 7px;
      margin-left: 7px !important;
    }
    .shuoshuo_img_item:nth-of-type(4n + 1) {
      margin: 0 7px;
      margin-left: 0px !important;
    }
  }
}
</style>
