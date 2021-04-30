<template>
  <div id="sign-in_card_wrap" class="card_common ig_card_common_w">
    <div class="sign-in_card_top">
      <span class="sign-in_card_title under_line_title f17">签到</span>
      <span class="sign-in_card_tip f13">已累计签到{{ signTimes }}天</span>
    </div>
    <div class="sign-in_content">
      <div
        v-for="(item, index) in signInData"
        :key="index"
        class="sign-in_item_wrap"
      >
        <div class="sign-in_item">
          <p></p>
          <svg-icon
            icon-class="tick"
            class="sign-in_icon"
            v-if="index < signInData.length - 1 && !item.signIn"
          ></svg-icon>
          <svg-icon
            icon-class="tick_active"
            class="sign-in_icon"
            v-if="index < signInData.length - 1 && item.signIn"
          ></svg-icon>
          <svg-icon
            icon-class="gift"
            class="sign-in_icon gift"
            v-if="index == signInData.length - 1 && !item.signIn"
          ></svg-icon>
          <svg-icon
            icon-class="gift_active"
            class="sign-in_icon gift"
            v-if="index == signInData.length - 1 && item.signIn"
          ></svg-icon>
          <p class="sign-in_day f14">第{{ index + 1 }}天</p>
        </div>
      </div>
    </div>
    <van-button
      class="sign-in_button"
      size="large"
      @click="signIn"
      :disabled="!!isSign"
      v-show="!isSign"
    >
      立即签到
    </van-button>
    <van-button class="sign-in_button_true" size="large" v-show="isSign">
      已签到
    </van-button>
    <van-popup
      class="tips_popup"
      v-model="showPopup"
      round
      get-container="body"
      :close-on-popstate="true"
      :close-on-click-overlay="false"
    >
      <svg-icon icon-class="tick_active" class="tips_icon"></svg-icon>
      <p class="tips_title">签到成功</p>
      <p class="tips_content">
        已完成签到，获得 <span style="color:#1452F5;">{{ rewardText }}</span>
      </p>
      <div class="tips_confirm" @click="closePopup">确定</div>
    </van-popup>
  </div>
</template>

<script>
import { signIn } from '@/api/task'
export default {
  name: 'SignInCard',
  props: {
    signInData: {
      type: Array,
      default() {
        return []
      }
    },
    signTimes: {
      type: Number,
      default() {
        return 0
      }
    },
    isSign: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      /* signInData: [
        {
          signIn: true,
          reward: 50
        },
        {
          signIn: true,
          reward: 50
        },
        {
          signIn: true,
          reward: 50
        }
      ],*/
      rewardText: '',
      showPopup: false
    }
  },
  mounted() {},
  methods: {
    async signIn() {
      /* for (let i = 0; i < this.signInData.length; i++) {
        if (!this.signInData[i].signIn) {
          this.signInData[i].signIn = true
          this.signInData[i].reward = 50
          this.showPopup = true
          return
        }
      }*/
      const res = await signIn()
      if (res.result === '0') {
        this.showPopup = true
        const index = this.signInData.findIndex(item => {
          return item.signIn === false
        })
        this.rewardText =
          (this.signInData[index].gold
            ? this.signInData[index].gold + '金币'
            : '') +
          (this.signInData[index].contribution
            ? this.signInData[index].contribution + '贡献值'
            : '') +
          this.signInData[index].other
        this.$emit('signIn')
      }
    },

    closePopup() {
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-in_card_wrap {
  .sign-in_card_top {
    display: flex;
    justify-content: space-between;

    .sign-in_card_tip {
      height: 16px;
      line-height: 16px;
      color: #999999;
    }
  }
  .sign-in_content {
    position: relative;
    display: flex;
    justify-content: space-between;

    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(100% - 50px);
      height: 0;
      border-bottom: 1px dashed #f9ab10;
      content: "";
      transform: translateX(-50%);
    }

    .sign-in_item_wrap {
      position: relative;
      z-index: 99;

      .sign-in_item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        //width: 27px;

        .sign-in_icon {
          margin: 9px 0 6px;
          font-size: 21px;
          &.gift{
            margin:0px 0 6px;
            font-size: 34px;
          }
        }

        p {
          height: 15px;
          line-height: 15px;
          color: #222222;
          transform: scale(0.9);
        }
      }

      &:after {
        position: absolute;
        top: 50%;
        right: -19px;
        display: none;
        width: 22px;
        height: 0;
        border-bottom: 1px dashed #f9ab10;
        content: "";
      }

      &:last-of-type {
        &:after {
          display: none;
        }
      }
    }
  }
  .sign-in_button {
    width: 120px;
    height: 33px;
    margin: 21px auto 0;
    line-height: 35px;
    color: #fff;
    text-align: center;
    background-color: #1452f5;
    border-radius: 15px;
  }
  .sign-in_button_true {
    width: 120px;
    height: 33px;
    margin: 21px auto 0;
    line-height: 35px;
    color: #fff;
    text-align: center;
    background-color: #c5c4c4;
    border-radius: 15px;
  }
}
.tips_popup {
  width: 300px;
  overflow: initial;
  //padding-top: 25px;
  text-align: center;
  box-sizing: border-box;

  .tips_icon {
    margin: -32px auto 10px;
    font-size: 64px;
  }

  .tips_title {
    margin-bottom: 10px;
    font-size: 18px;
  }

  .tips_content {
    padding: 0 15px 15px;
    font-size: 14px;
    line-height: 20px;
    color: #999;
    border-bottom: 0.02667rem solid #f4f4f4;
    box-sizing: border-box;
  }

  .tips_confirm {
    height: 45px;
    font-size: 18px;
    line-height: 45px;
    color: #1452f5;
  }
}
</style>
