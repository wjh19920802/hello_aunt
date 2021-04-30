<template>
  <div id="task">
    <div class="task_top bg_linear-gradient">
      <div class="t_t_info">
        <div class="t_t_id">
          <span class="t_t_s1">任务ID:</span
          ><span class="t_t_s2">123456789</span>
        </div>
        <div class="t_t_info_status">
          <span class="t_t_s1">任务状态:</span
          ><span class="t_t_s2">已完成</span>
        </div>
      </div>
      <p class="t_t_desc">
        MODEL Y震撼上市预热活动吧啦吧啦吧撼上市预热活动吧啦吧啦吧
      </p>
    </div>
    <div class="task_content">
      <div class="t_c_item">
        <svg-icon icon-class="task_reward" class="item_icon"></svg-icon>
        <div class="item_right">
          <p class="i_r_title">任务奖励</p>
          <p class="i_r_content">转发并评论微博，奖励100积分</p>
        </div>
      </div>
      <div class="t_line"></div>
      <div class="t_c_item">
        <svg-icon icon-class="task_end_time" class="item_icon"></svg-icon>
        <div class="item_right">
          <p class="i_r_title">任务截止时间</p>
          <p class="i_r_content">2018年8月18日18:00</p>
        </div>
      </div>
      <div class="t_line"></div>
      <div class="t_c_item">
        <svg-icon icon-class="task_intro" class="item_icon"></svg-icon>
        <div class="item_right">
          <p class="i_r_title">任务介绍</p>
          <p class="i_r_content">
            1.拍摄特斯拉毛豆3相关视频。 2.将视频发布到自己的抖音账号。
            3.复制抖音视频链接，提交给客服审
            核，客服审核通过后即可获得积分奖励。
          </p>
        </div>
      </div>
    </div>
    <div class="task_example bg_linear-gradient">
      <div class="t_e_text">
        <p>操作示例</p>
        <p>转发并评论微博，奖励100积分</p>
      </div>
      <div class="t_e_icon_wrap">
        <svg-icon icon-class="task_fangda" class="t_e_icon"></svg-icon>
      </div>
    </div>
    <div class="task_link">
      <div>
        <span>查看任务链接</span><span class="right_arrow_1"></span
        ><span class="right_arrow_2"></span><span class="right_arrow_3"></span>
      </div>
    </div>
    <div class="task_result">
      <div class="t_s_status">
        <svg-icon icon-class="task_result" class="task_result_icon"></svg-icon>
        <div class="t_s_status_right">
          <p class="s_r_title">审核结果</p>
          <p class="s_r_content">审核通过，积分已发放</p>
        </div>
      </div>
      <div class="t_line"></div>
      <div class="t_s_content">
        <div class="c_item">
          <svg-icon icon-class="task_service" class="task_service"></svg-icon>
          <div class="c_item_r">
            <p class="c_item_r_name">Admin</p>
            <div class="c_item_r_inner">
              <div class="inner_content">系统审核通过，积分已发放</div>
              <div class="inner_time">2018年8月18日18:00</div>
            </div>
          </div>
        </div>
      </div>
      <div class="t_s_supplement" @click="toMaterial">
        <svg-icon icon-class="task_edit" class="task_edit"></svg-icon>
        <span class="supplement">补充资料</span>
      </div>
    </div>
    <div class="task_receive_btn">领取任务</div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  components: {},
  data() {
    return {
      id: 0
    }
  },
  watch: {
    test() {}
  },
  mounted() {
    this.id = this.$route.params.id
  },
  methods: {
    toMaterial() {
      this.$router.push({
        name: 'Material',
        params: {
          id: this.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#task {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .task_top {
    width: 100%;
    height: 140px;

    .t_t_info {
      display: flex;
      width: 100%;
      height: 45px;
      padding: 0 15px;
      margin-bottom: 15px;
      font-size: 13px;
      color: #fff;
      background: rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
    }

    .t_t_desc {
      width: 100%;
      padding: 0 15px;
      font-size: 15px;
      font-weight: bold;
      line-height: 21px;
      color: #ffffff;
      text-align: left;
      box-sizing: border-box;
    }
  }

  .task_content {
    width: 100%;
    padding: 15px 15px 0;
    margin-top: -15px;
    margin-bottom: 17px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
    box-sizing: border-box;

    .t_c_item {
      display: flex;
      padding: 15px 11px;
      text-align: left;

      .item_icon {
        margin-right: 11px;
        font-size: 27px;
      }

      .item_right {
        flex: 1;

        .i_r_title {
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
          color: #222222;
        }

        .i_r_content {
          font-size: 11px;
          line-height: 15px;
          color: #999999;
        }
      }
    }
  }

  .task_example {
    display: flex;
    width: calc(100% - 30px);
    height: 60px;
    padding: 0 15px 0 24px;
    margin: 0 auto 15px;
    border-radius: 12px;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;

    .t_e_text {
      text-align: left;

      p:first-of-type {
        margin-bottom: 2px;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        color: #ffffff;
      }

      p:last-of-type {
        font-size: 12px;
        line-height: 16px;
        color: #ffffff;
      }
    }

    .t_e_icon_wrap {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 20px;

      .t_e_icon {
        font-size: 18px;
      }
    }
  }

  .task_link {
    display: flex;
    width: calc(100% - 30px);
    height: 40px;
    margin: 0 auto 15px;
    font-size: 13px;
    font-weight: bold;
    line-height: 19px;
    color: #1452f5;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    justify-content: space-around;
    align-items: center;

    .right_arrow_1 {
      opacity: 0.2;
      @include right-arrow(#c5c4c4);
    }

    .right_arrow_2 {
      position: relative;
      left: -8px;
      opacity: 0.6;
      @include right-arrow(#c5c4c4);
    }

    .right_arrow_3 {
      position: relative;
      left: -15px;
      @include right-arrow(#c5c4c4);
    }
  }

  .task_result {
    width: 100%;
    padding: 15px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
    box-sizing: border-box;

    .t_s_status {
      display: flex;
      padding: 15px 11px;
      text-align: left;

      .task_result_icon {
        margin-right: 11px;
        font-size: 27px;
      }

      .t_s_status_right {
        flex: 1;

        .s_r_title {
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
          color: #222222;
        }

        .s_r_content {
          font-size: 11px;
          line-height: 15px;
          color: #999999;
        }
      }
    }

    .t_s_content {
      width: 100%;
      padding: 20px 6px 16px 10px;
      box-sizing: border-box;

      .c_item {
        display: flex;
        width: 100%;

        .task_service {
          margin-right: 9px;
          font-size: 30px;
        }

        .c_item_r {
          text-align: left;
          flex: 1;

          .c_item_r_name {
            margin-bottom: 5px;
            font-size: 13px;
            line-height: 19px;
            color: #999999;
          }

          .c_item_r_inner {
            width: 240px;
            padding: 6px 12px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
            box-sizing: border-box;

            .inner_content {
              font-size: 14px;
              line-height: 18px;
              color: #222222;
            }

            .inner_time {
              font-size: 12px;
              line-height: 17px;
              color: #999999;
            }
          }
        }
      }
    }

    .t_s_supplement {
      width: 100%;
      font-size: 12px;
      color: #1452f5;
      text-align: right;

      .task_edit {
        margin-right: 5px;
        font-size: 13px;
      }
    }
  }

  .task_receive_btn {
    width: calc(100% - 30px);
    height: 47px;
    margin: 30px auto 53px;
    font-size: 20px;
    line-height: 47px;
    color: #fff;
    text-align: center;
    background-color: #1452f5;
    border-radius: 24px;
  }

  .t_line {
    width: 100%;
    height: 1px;
    background-color: rgba(199, 199, 199, .3);
  }
}
</style>
