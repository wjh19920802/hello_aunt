<template>
  <div id="withdraw_wrap" class="card_common ig_card_common_w">
    <div class="withdraw_title">
      <span>提现到微信</span>
    </div>
    <div class="withdraw_content">
      <span>¥</span>
      <van-field
        class="withdraw_input"
        v-model="searchValue"
        type="number"
        placeholder="输入提现金额"
        @input="inputMoney"
      />
    </div>
    <div class="withdraw_tips">
      <span
        >最小提现金额 <span class="high-light">10</span>元，当前最多可提现
        <span class="high-light">{{ balance }}</span
        >元</span
      >
    </div>
    <van-button
      class="withdraw_button ig_withdraw_button"
      type="info"
      :disabled="!canWithdraw"
      @click="withdraw"
      >确认提现</van-button
    >
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Withdraw',
  components: {},
  data() {
    return {
      searchValue: '',
      prevNumber: '', // 上一次输入的值
      canWithdraw: true
    }
  },
  computed: {
    balance() {
      return this.$store.state.app.userInfo.vipGoldBalance / 100
    }
  },
  watch: {
    test() {}
  },
  mounted() {},
  methods: {
    inputMoney(val) {
      const withdrawNumber = val
      const reg = /^\d*(\.\d{0,2})?$/
      if (withdrawNumber.indexOf('.') == 0) {
        this.searchValue = 0
      } else if (reg.test(withdrawNumber)) {
        this.searchValue = withdrawNumber
      } else {
        this.searchValue = this.prevNumber
      }
      this.prevNumber = this.searchValue
      if (
        this.searchValue == 0 ||
        this.searchValue > this.balance ||
        this.searchValue < 10
      ) {
        // this.canWithdraw = false
      } else {
        // this.canWithdraw = true
      }
    },
    withdraw() {
      Toast('敬请期待')
      return
      this.$router.replace({
        name: 'WithdrawProcess'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#withdraw_wrap {
  padding: 16px 20px 30px;
  .withdraw_title {
    margin-bottom: 13px;
    font-size: 15px;
    font-weight: bold;
    line-height: 21px;
    color: #222222;
    text-align: left;
  }

  .withdraw_content {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid #f8f8f8;

    span {
      font-size: 40px;
      font-weight: bold;
      line-height: 56px;
      color: #222222;
    }

    .withdraw_input {
      padding: 0 9px;
      font-size: 30px;

      /deep/.van-field__control {
        color: #1452f5;
      }
      /deep/.van-field__control::placeholder {
        font-size: 20px;
      }
    }
  }

  .withdraw_tips {
    margin-bottom: 22px;
    font-size: 12px;
    line-height: 16px;
    color: #999999;
    text-align: left;

    .high-light {
      color: #ff0000;
    }
  }

  .ig_withdraw_button {
    width: calc(100% - 90px);
    height: 47px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 47px;
    color: #fff;
    text-align: center;
    background-color: #1452f5;
    border-radius: 10px;
  }
}
</style>
