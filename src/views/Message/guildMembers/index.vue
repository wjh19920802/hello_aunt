<template>
  <div class="member_content">
    <div class="message_ctl">
      <div
        :class="{ message_ctl_item: true, active: isActive == 0 }"
        @click="setActive(0)"
      >
        <p>全部</p>
        <span></span>
      </div>
      <div
        :class="{ message_ctl_item: true, active: isActive == 1 }"
        @click="setActive(1)"
      >
        <p>待审核</p>
        <span></span>
      </div>
    </div>
    <div class="message_data">
      <!-- 全部 -->
      <div class="message_data_item" v-if="isActive == 0">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="member_item" v-for="(row, index) in list" :key="index">
            <div class="title">
              <img :src="usericon" />
              <div>
                <h3>
                  <span>{{ row.name }}</span> 申请加入公会
                </h3>
                <p>{{ row.title }}</p>
              </div>
            </div>
            <div
              :class="{ ctl: true, active: row.isAdd == false }"
              @click="showTotal(row,index)"
            >
              {{ row.isAdd ? "同意" : "已同意" }}
            </div>
          </div>
        </van-list>
      </div>
      <div class="message_data_item" v-if="isActive == 1"></div>
    </div>

    <div class="total_member" v-if="isTotal">
      <div class="total_data">
        <h2>申请加入公会</h2>
        <textarea v-model="text"> </textarea>
        <div class="ctl">
          <div @click="hideTotal()">返回</div>
          <div @click="submitTotal()">同意</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usericon from '../../../assets/imgs/usericon.png'
export default {
  name: 'GuildMember',

  data() {
    return {
      usericon,
      isActive: 0,
      // 上拉加载
      loading: false,
      finished: false,
      isTotal: false,
      text:
        '你好，我是郭采洁。你好，我是郭采洁。你好，我是郭采洁。你好，我是郭采洁。',
      list: [
        {
          name: '郭采洁',
          title: '你好，我是郭采洁',
          isAdd: false
        },
        {
          name: '郭采洁',
          title: '你好，我是郭采洁',
          isAdd: true
        },
        {
          name: '郭采洁',
          title: '你好，我是郭采洁',
          isAdd: true
        },
        {
          name: '郭采洁',
          title: '你好，我是郭采洁',
          isAdd: false
        }
      ],
      isActiveIndex: '',
      isActiveRow: ''
    }
  },
  watch: {},
  mounted() {},
  methods: {
    showTotal(row, index) {
      if (row.isAdd) {
        this.isTotal = true
        this.isActiveIndex = index
        this.isActiveRow = row
      }
    },
    hideTotal() {
      this.isTotal = false
    },
    submitTotal() {
      this.isTotal = false
      this.$set(this.list, this.isActiveIndex, Object.assign({}, this.isActiveRow, { isAdd: false }))
    },
    // 上拉加载数据
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list[0])
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    setActive(index) {
      this.isActive = index
    }
  }
}
</script>

<style lang="scss" scoped>
.member_content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
  overflow: scroll;
  .message_ctl {
    width: 375px;
    height: 47px;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(229, 229, 229, 1);
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    position: fixed;
    top: 0;
    z-index: 1000;
    margin: 0px auto;
    .message_ctl_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        width: 50px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;

        color: #353535;
        line-height: 20px;
        margin-bottom: 11px;
        margin-top: 13px;
      }
      span {
        width: 30px;
        height: 2px;
        background: #ffffff;
        border-radius: 50px;
        display: block;
      }

      &.active {
        p {
          color: #1452f5;
        }
        span {
          background: #1452f5;
        }
      }
    }
  }
  .message_data {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    box-sizing: border-box;
    background: #ffffff;
    padding-top: 47px;

    .member_item {
      display: flex;
      box-sizing: border-box;
      padding: 0px 15px;
      margin-top: 17px;
      .title {
        flex: 1;
        display: flex;
        img {
          width: 42px;
          height: 42px;
          margin-right: 13px;
        }
        h3 {
          width: 200px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 20px;
          margin-bottom: 2px;
          text-align: left;
          display: flex;
          span {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 20px;
            color: #1452f5;
            margin-right: 8px;
            display: block;
          }
        }
        p {
          width: 200px;
          height: 19px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 19px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left;
        }
      }
      .ctl {
        width: 59px;
        height: 21px;
        border-radius: 11px;
        border: 1px solid #1452f5;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1452f5;
        line-height: 21px;
        text-align: center;
        margin-top: 10px;
        &:active{
              color: #ffffff;
              background-color: #1452f5;
          }
        &.active {
          border: 1px solid #888888;
          color: #888888;
          &:active{
              color: #888888;
              background-color: #ffffff;
          }
        }
      }
    }
  }
  .total_member {
    position: fixed;
    left: 0;
    right: 0;
    top: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2000;
    .total_data {
      width: 300px;
      height: 222px;
      background: #ffffff;
      border-radius: 10px;
      position: absolute;
      margin-left: -150px;
      margin-top: -111px;
      left: 50%;
      top: 50%;
      h2 {
        width: 100%;
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
        line-height: 25px;
        text-align: center;
        margin-top: 19px;
      }
      textarea {
        margin-top: 15px;
        width: 260px;
        height: 90px;
        border: 1px solid #999999;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #888888;
        line-height: 21px;
        text-align: left;
        box-sizing: border-box;
        padding: 11px;
      }
      .ctl {
        display: flex;
        border-top: 1px solid #f7f7f7;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        div {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 50px;
          flex: 1;
          height: 50px;
          text-align: center;
          border-bottom-left-radius: 10px;
          &:active {
            background-color: #f7f7f7;
          }
          &:nth-child(2) {
            background-color: #1452f5;
            color: #ffffff;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 10px;
            &:active {
              background-color: #0c3fbe;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 769px) {
  .message_ctl {
    width: 750PX !important;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(229, 229, 229, 1);
    display: flex;
    position: fixed;
    top: 0;
    left: 50% !important;
    margin-left: -375PX !important;
  }
}
</style>
