<template>
  <div id="reward_card_wrap" class="card_common ig_card_common_w">
    <div class="reward_card_top">
      <svg-icon
        icon-class="tips"
        class="reward_card_top_tips"
        @click="toContributionDetail(1)"
      ></svg-icon>
      <div class="reward_card_top_sec">
        <span class="sec_title under_line_title f17">我的金币</span>
        <div class="sec_content">
          <svg-icon icon-class="coin" class="sec_icon"></svg-icon>
          <div class="sec_inner">
            <p class="sec_value f15">{{ userInfo.vipGoldBalance }}</p>
            <p class="sec_to" @click="toGoldCoin">
              <span class="f14">去提现</span><span class="right_arrow"></span>
            </p>
          </div>
        </div>
      </div>
      <div class="reward_card_top_line"></div>
      <div class="reward_card_top_sec">
        <span class="sec_title under_line_title f17">我的贡献值</span>
        <div class="sec_content">
          <svg-icon icon-class="contribution" class="sec_icon"></svg-icon>
          <div class="sec_inner">
            <p class="sec_value f15">{{ userInfo.vipContributionBalance }}</p>
            <p class="sec_to" @click="toContributionDetail">
              <span class="f14">查看明细</span><span class="right_arrow"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <p class="reward_card_bottom f14">做任务，快速赚取金币，提升公会贡献值</p>
    <van-popup
      class="tips_popup"
      v-model="showPopup"
      round
      get-container="body"
      :close-on-popstate="true"
      :close-on-click-overlay="false"
    >
      <p class="tips_title">贡献值</p>
      <p class="tips_content">
        加入公会后可为所属公会累计贡献值，未加入公会，做任务无法累计贡献值
      </p>
      <div class="tips_confirm" @click="closePopup">确定</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'RewardCard',
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showPopup: false
    }
  },
  computed: {},
  methods: {
    toGoldCoin() {
      this.$router.push({
        name: 'GoldCoin'
      })
    },
    toContributionDetail(flag) {
      if (flag === 1 || this.userInfo.vipRole == 4) {
        this.showPopup = true
      } else {
        this.$router.push({
          name: 'GoldCoinDetail',
          params: {
            type: 2
          }
        })
      }
    },
    closePopup() {
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
#reward_card_wrap {
  .reward_card_top {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 13px;

    .reward_card_top_tips {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 21px;
    }

    .reward_card_top_sec {
      width: 45%;
      text-align: left;

      .sec_content {
        display: flex;
        align-items: center;

        .sec_icon {
          margin-right: 15px;
          font-size: 50px;
        }

        @media screen and (min-width: 750px) {
          .sec_icon {
            margin-right: 70px;
            font-size: 50px;
          }
        }

        .sec_inner {
          .sec_value {
            height: 21px;
            margin-bottom: 3px;
            font-weight: bold;
            line-height: 21px;
            color: #222;
          }

          .sec_to {
            height: 18px;
            line-height: 18px;
            color: #1452f5;

            .right_arrow {
              @include right-arrow();
            }
          }
        }
      }
    }
    .reward_card_top_line {
      width: 1px;
      height: 90px;
      background-color: #f8f8f8;
    }
    /*.reward_card_top_sec:first-of-type {
      border-right: 1px solid #f8f8f8;
    }*/
  }

  .reward_card_bottom {
    height: 16px;
    line-height: 16px;
    color: #999;
    text-align: left;
  }
}

.tips_popup {
  width: 300px;
  height: 155px;
  padding-top: 25px;
  text-align: center;
  box-sizing: border-box;

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
