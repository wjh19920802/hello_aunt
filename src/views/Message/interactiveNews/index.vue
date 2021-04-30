<template>
  <div class="message_content">
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
        <p>点赞</p>
        <span></span>
      </div>
      <div
        :class="{ message_ctl_item: true, active: isActive == 2 }"
        @click="setActive(2)"
      >
        <p>评论</p>
        <span></span>
      </div>
      <div
        :class="{ message_ctl_item: true, active: isActive == 3 }"
        @click="setActive(3)"
      >
        <p>转发</p>
        <span></span>
      </div>
    </div>
    <div class="message_data">
      <!-- 全部 -->
      <div class="message_data_item" v-if="isActive == 0">
        <div class="interactive_item" v-for="(row, index) in list" :key="index">
          <div class="icon">
            <img :src="user" />
          </div>
          <div class="title">
            <div class="title_header">
              <div class="text">
                <h3>{{ row.name }}</h3>
                <div class="data">
                  <p>{{ row.typeTitle }}</p>
                  <span class="time">{{ row.time }}</span>
                </div>
              </div>
              <div class="image"></div>
            </div>
            <p class="title_bottom">{{ row.p }}</p>
          </div>
        </div>
      </div>
      <!-- 点赞 -->
      <div class="message_data_item" v-if="isActive == 1"></div>
      <!-- 评论 -->
      <div class="message_data_item" v-if="isActive == 2"></div>
      <!-- 转发 -->
      <div class="message_data_item" v-if="isActive == 3"></div>
    </div>
  </div>
</template>

<script>
import user from '../../../assets/imgs/usericon.png'
export default {
  name: 'InterativeNews',
  data() {
    return {
      isActive: 0,
      user: user,
      list: [
        {
          name: '郭彩霞',
          typeTitle: '转发了你的视频',
          time: '2020-10-10',
          p: '关于2018，十区市大妈有话说，俺们家这些变化最带劲'
        },
        {
          name: '郭彩霞',
          typeTitle: '转发了你的视频',
          time: '2020-10-10',
          p: ''
        },
        {
          name: '郭彩霞',
          typeTitle: '转发了你的视频',
          time: '2020-10-10',
          p: '关于2018，十区市大妈有话说，俺们家这些变化最带劲'
        },
        {
          name: '郭彩霞',
          typeTitle: '转发了你的视频',
          time: '2020-10-10',
          p: ''
        }
      ]
    }
  },
  methods: {
    setActive(index) {
      this.isActive = index
    }
  }
}
</script>
<style lang="scss" scoped>
.message_content {
  .message_ctl {
    width: 100%;
    height: 47px;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(229, 229, 229, 1);
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    .message_ctl_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        width: 60px;
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

    .interactive_item {
      display: flex;
      margin: 0px 15px;
      .icon {
        width: 42px;
        height: 42px;
        background: transparent;
        border-radius: 50%;
        margin-right: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 12px;
        img {
          width: 42px;
          height: 42px;
        }
      }
      .title {
        flex: 1;
        border-bottom: 1px solid rgba(199, 199, 199, .3);
        padding: 12px 0px;
        position: relative;
        margin-bottom: 2px;
        .title_header {
          display: flex;
          margin-bottom: 2px;
          .image {
            width: 42px;
            height: 42px;
            background: #d8d8d8;
            border-radius: 5px;
          }
          .text{
              flex:1;
          }
          h3 {
            width: 90px;
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 20px;
            text-align: left;
            margin-bottom: 2px;
          }
          .data {
            display: flex;
            p {
              width: 100px;
              height: 19px;
              font-size: 13px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 19px;
              text-align: left;
            }
            span {
              width: 73px;
              height: 19px;
              font-size: 13px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 19px;
            }
          }
        }
        .title_bottom {
          width: 224px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 19px;
          text-align: left;
        }
      }
    }
  }
}
@media screen and (min-width: 769px) {
  .message_ctl {
    position: fixed;
    width: 750PX !important;
    left: 50%  !important;
    margin-left: -375PX !important;
    top: 0px;
    bottom: 0px;
    background: #f3f3f3;
  }
}
</style>

