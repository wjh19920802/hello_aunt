<template>
  <div id="gold_count_wrap" class="card_common ig_card_common_w">
    <div class="gold_count_title">
      <span>我的金币</span>
    </div>
    <div class="gold_count_content">
      <div class="gold_balance content_item">
        <span>{{ userInfo.vipGoldBalance }}</span>
        <span>金币余额</span>
      </div>
      <div class="gold_withdrawn content_item">
        <span>{{ userInfo.vipGoldConsume }}</span>
        <span>已提现金币</span>
      </div>
    </div>
    <div class="line ig_line_w"></div>
    <div class="gold_count_tips">
      <span>100金币=1元</span>
      <span @click="toDetail">
        <span>我的金币明细</span>
        <span class="right_arrow"></span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoldCountCard',
  components: {},
  data() {
    return {}
  },
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo
    }
  },
  watch: {
    test() {}
  },
  mounted() {},
  methods: {
    toDetail() {
      this.$router.push({
        name: 'GoldCoinDetail',
        params: {
          type: 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#gold_count_wrap {
  .gold_count_title {
    margin-bottom: 13px;
    font-size: 15px;
    font-weight: bold;
    line-height: 21px;
    color: #222222;
    text-align: left;
  }

  .gold_count_content {
    display: flex;
    width: 100%;
    height: 45px;

    .content_item {
      display: flex;
      width: 50%;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      span:nth-of-type(1) {
        font-size: 18px;
        font-weight: bold;
        line-height: 25px;
        color: #222222;
      }

      span:nth-of-type(2) {
        font-size: 13px;
        line-height: 18px;
        color: #1452f5;
      }
    }

    .content_item:first-of-type {
      border-right: 1px dashed #f8f8f8;
    }
  }

  .line {
    position: relative;
    left: 50%;
    height: 1px;
    margin: 14px auto 6px;
    background-color: #f8f8f8;
    transform: translateX(-50%);
  }
  .ig_line_w {
    width: 100%;
  }

  .gold_count_tips {
    position: relative;
    top: 7px;
    display: flex;
    width: 100%;
    justify-content: space-between;

    span {
      font-size: 12px;
      line-height: 16px;
      color: #999999;
    }

    .right_arrow {
      vertical-align: baseline;
      @include right-arrow(#c5c4c4);
    }
  }
}
</style>
