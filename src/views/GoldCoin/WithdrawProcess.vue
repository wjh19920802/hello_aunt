<template>
  <div id="withdraw_process">
    <div class="withdraw_process_t">
      <div class="withdraw_process_t_s withdraw_process_t_s1 ">
        <div class="green_point">
          <div></div>
        </div>
        <div class="withdraw_start">
          <p>发起提现申请</p>
          <p>2020-12-12 11:56:18</p>
        </div>
      </div>
      <div class="withdraw_process_t_s withdraw_process_t_s2">
        <svg-icon class="withdraw_hourglass" icon-class="hourglass"></svg-icon>
        <p>平台处理中</p>
      </div>
      <div class="withdraw_process_t_s">
        <svg-icon class="withdraw_success" icon-class="success"></svg-icon>
        <p>到账成功</p>
      </div>
      <div class="withdraw_process_t_s">
        <svg-icon class="withdraw_success" icon-class="success_active"></svg-icon>
        <p>到账成功</p>
      </div>
      <div class="withdraw_process_t_s">
        <svg-icon class="withdraw_success" icon-class="fail"></svg-icon>
        <p>到账失败</p>
      </div>
      <div class="withdraw_process_line line1"></div>
      <div
        class="withdraw_process_line line2"
        :class="{ line_gray: status == 1 }"
      ></div>
    </div>
    <div class="withdraw_process_center_line"></div>
    <div class="withdraw_process_b">
      <div class="withdraw_process_b_s">
        <p class="withdraw_process_p_l">提现金额</p>
        <p class="withdraw_process_p_r">¥ 100.0</p>
      </div>
      <div class="withdraw_process_b_s">
        <p class="withdraw_process_p_l">提现至</p>
        <p class="withdraw_process_p_r">微信昵称 微信零钱</p>
      </div>
      <div class="withdraw_process_b_s">
        <p class="withdraw_process_p_l"></p>
        <p class="withdraw_process_p_r withdraw_process_p_liushui">
          流水号：202012281212001
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithdrawProcess',
  components: {},
  data() {
    return {
      status: 1
    }
  },
  watch: {
    test() {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
#withdraw_process {
  padding: 50px 30px;
  box-sizing: border-box;
  .withdraw_process_t {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;

    .withdraw_process_t_s {
      display: flex;
      align-items: center;

      .green_point {
        width: 47px;
        height: 47px;
        margin-right: 7px;

        div {
          position: relative;
          top: 10px;
          width: 12px;
          height: 12px;
          margin: 0 auto;
          background-color: #02bb00;
          border-radius: 50%;
        }
      }

      .withdraw_start {
        text-align: left;

        p:first-of-type {
          height: 24px;
          margin-bottom: 5px;
          font-size: 17px;
          line-height: 24px;
          color: #222222;
        }

        p:nth-of-type(2) {
          height: 18px;
          font-size: 13px;
          line-height: 18px;
          color: #999999;
        }
      }

      .withdraw_hourglass,
      .withdraw_success,
      .withdraw_success_active {
        margin-right: 7px;
        font-size: 47px;
      }

      p {
        font-size: 17px;
        line-height: 24px;
        color: #222222;
      }
    }

    .withdraw_process_t_s1 {
      margin-bottom: 26px;
    }

    .withdraw_process_t_s2 {
      margin-bottom: 56px;
    }

    .withdraw_process_line {
      width: 0;
      border-right: 1px dashed #02bb00;
    }
    .line1 {
      position: absolute;
      top: 75px;
      left: 53px;
      height: 50px;
    }
    .line2 {
      position: absolute;
      top: 170px;
      left: 53px;
      height: 60px;
    }

    .line_gray {
      border-right: 1px dashed #c5c4c4;
    }
  }

  .withdraw_process_center_line {
    width: 100%;
    height: 0;
    margin: 30px auto 18px;
    border-bottom: 1px dashed rgba(199, 199, 199, .3);
  }

  .withdraw_process_b {
    width: 100%;

    .withdraw_process_b_s {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .withdraw_process_p_l {
        font-size: 13px;
        line-height: 18px;
        color: #999999;
      }

      .withdraw_process_p_r {
        font-size: 13px;
        line-height: 18px;
        color: #222222;
      }

      .withdraw_process_p_liushui {
        font-size: 10px;
        line-height: 14px;
        color: #999999;
      }
    }
  }
}
</style>
