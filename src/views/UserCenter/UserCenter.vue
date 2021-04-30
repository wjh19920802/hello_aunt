<template>
  <div class="home_content">
    <div class="home_header"></div>
    <div class="user_content">
      <div class="user_title">
        <img @click="showPersonalHomepage" :src="userImg" />
        <div>
          <div class="name">
            <h1 @click="showPersonalHomepage" >
              {{ user }}
            </h1>
            <div @click="showPersonalHomepage">
              <span> 个人主页</span> <img :src="userYou" />
            </div>
          </div>
          <p @click="showPersonalHomepage" >简介：{{ title }}</p>
        </div>
      </div>
      <div class="user_ctl">
        <div class="user_ctl_item" @click="showguild">
          <img :src="gonghui_ctl" />
          <p>我的公会</p>
        </div>
        <div class="user_ctl_item" @click="showgoldcoin">
          <img :src="jingbi_ctl" />
          <p>我的金币</p>
        </div>
        <div class="user_ctl_item" @click="showTask">
          <img :src="renwu_ctl" />
          <p>我的任务</p>
        </div>
        <div class="user_ctl_item" @click="showToast">
          <img :src="youxi_ctl" />
          <p>玫瑰花园</p>
        </div>
      </div>
      <div class="rightsandinterests_content">
        <div>
          <p>公会等级权益</p>
        </div>
        <div @click="showPower()">
          <p class="title">提升公会等级，解锁权益</p>
          <img :src="qianyi" />
        </div>
      </div>

      <div class="user_data">
        <div class="user_data_item" @click="routerAboutus">
          <img :src="guanyuwomen" />
          <p>关于我们</p>
          <img class="you" :src="you" />
        </div>
        <div class="user_data_item" @click="showFeedback">
          <img :src="tousujianyi" />
          <p>意见反馈</p>
          <img class="you" :src="you" />
        </div>
        <div class="user_data_item" @click="showCustomerService">
          <img :src="webicon" />
          <p>联系客服</p>
          <img class="you" :src="you" />
        </div>
        <div class="user_data_item" @click="showLoginBox">
          <img :src="tuichudenglu" />
          <p>退出登录</p>
          <img class="you" :src="you" />
        </div>
      </div>
    </div>
    <div class="total_title" v-if="total_title">敬请期待</div>

    <van-action-sheet
      v-model="isloginBox"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { ActionSheet } from 'vant'
import { Toast } from 'vant'
import wx from 'weixin-js-sdk'

Vue.use(ActionSheet)
import { getInfo } from '@/api/info'
import userYou from '../../assets/imgs/userYou.png'
import user from '../../assets/imgs/user.png'

import gonghui_ctl from '../../assets/imgs/gonhui_ctl.png'

import jingbi_ctl from '../../assets/imgs/jingbi_ctl.png'

import youxi_ctl from '../../assets/imgs/youxi_ctl.png'

import renwu_ctl from '../../assets/imgs/renwu_ctl.png'

import qianyi from '../../assets/imgs/qianyi.png'
import guanyuwomen from '../../assets/imgs/guanyuwomen.png'
import tousujianyi from '../../assets/imgs/tousujianyi.png'
import tuichudenglu from '../../assets/imgs/tuichudenglu.png'
import webicon from '../../assets/imgs/webicon.png'
import you from '../../assets/imgs/you.png'
export default {
  name: 'UserCenter',

  data() {
    return {
      dayAdd: 10,
      mouthAdd: 30,
      countAdd: 100,
      userYou,
      qianyi,
      gonghui_ctl,
      youxi_ctl,
      renwu_ctl,
      jingbi_ctl,
      tousujianyi: tousujianyi,
      tuichudenglu: tuichudenglu,
      guanyuwomen: guanyuwomen,
      webicon: webicon,
      you: you,
      user: '',
      title: '您还没有填写个人简介哦',
      userId: '',
      userImg: user,
      total_title: false,
      isloginBox: false,
      actions: [{ name: '退出登录' }, { name: '取消' }],
      tabData: [
        {
          id: 1,
          title: '首页'
        },
        {
          id: 2,
          title: '公会'
        },
        {
          id: 3,
          title: '我的'
        }
      ], // tab栏列表
      activeIndex: 0 // tab栏当前索引
    }
  },
  mounted() {
    this.getInfoData()
    this.getVipDetail()
  },
  methods: {
    showToast() {
      Toast('敬请期待')
    },
    // 获取个人信息
    getInfoData() {
      const that = this
      getInfo().then(function(res) {
        if (res.result == 0) {
          console.log(res)
          that.user = res.data.vipNick
          that.userImg = res.data.vipPic
          that.userId = res.data.id
          if (
            !(
              !res.data.vipIntroduce &&
              typeof res.data.vipIntroduce !== 'undefined' &&
              res.data.vipIntroduce != 0
            )
          ) {
            that.title = res.data.vipIntroduce
          }
        }
      })
    },
    showTotalTitle() {
      this.total_title = true
      const _that = this
      setTimeout(function() {
        _that.total_title = false
      }, 1000)
    },
    routerGO() {
      this.$router.go(-1)
    },
    routerAboutus() {
      this.$router.push({ path: '/aboutus' })
    },
    signout() {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('vuex')
      wx.closeWindow()
    },
    showInvitation() {
      this.$router.push({ path: '/invitation' })
    },
    showgoldcoin() {
      this.$router.push({
        path: '/gold-coin'
      })
    },
    showPower() {
      this.$router.push({ path: '/power' })
    },
    showFeedback() {
      this.$router.push({ path: '/feedback' })
    },
    showCustomerService() {
      this.$router.push({ path: '/customerService' })
    },
    showguild() {
      if (this.$store.state.app.userInfo.vipRole != 4) {
        this.$router.push({ name: 'SelfGuild' })
      } else {
        Toast('暂未加入公会')
      }
    },
    showTask() {
      this.$router.push({ name: 'SelfTask' })
    },
    showPersonalHomepage() {
      if (this.userId != '') {
        this.$router.push({
          path: '/personalHomepage',
          query: {
            userId: this.userId
          }
        })
      }
    },

    hideLoginBox() {
      this.isloginBox = false
    },
    showLoginBox() {
      this.isloginBox = true
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      if (item.name == '退出登录') {
        this.signout()
      } else {
        this.hideLoginBox()
      }
    },
    getVipDetail() {
      this.$store.dispatch('app/setUserInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.home_content {
  width: 100%;
  // overflow: hidden;
  position: relative;
  .home_header {
    position: absolute;
    left: 50%;
    top: 0px;
    margin-left: -400px;
    width: 800px;
    height: 173px;
    background: linear-gradient(90deg, #ed17aa 0%, #1452f5 100%);
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
  }
  .user_title {
    width: 325px;
    margin: 0px auto;
    margin-top: 15px;
    display: flex;
    img {
      width: 73px;
      height: 73px;
      border: 2px solid #fff;
      border-radius: 50%;
      box-sizing: border-box;
      margin-right: 15px;
      background: #ffffff;
    }
    div {
      .name {
        width: 200px;
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 25px;
        text-align: left;
        margin-top: 9px;
        margin-bottom: 8px;
        display: flex;

        h1 {
          min-width: 80px;
          max-width: 100px;
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 25px;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        div {
          width: 80px;
          height: 21px;
          margin-left: 15px;
          vertical-align: top;
          margin-top: 2px;
          text-align: center;
          background-color: #ffffff;
          border-radius: 11px;
          display: flex;
          justify-content: center;
          span {
            font-size: 11px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #1452f5;
            line-height: 21px;
            display: block;
          }
          img {
            width: 5px;
            height: 10px;
            vertical-align: top;
            margin-top: 6px;
            margin-left: 6px;
            margin-right: 0px;
            border-radius: 0px;
            border: 0px;
            background-color: transparent;
          }
        }
      }

      p {
        width: 240px;
        height: 17px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 17px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:active {
          color: #1452f5;
        }
      }
    }
  }
  .user_ctl {
    width: 345px;
    height: 105px;
    background: #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin: 0px auto;
    margin-top: 12px;
    display: flex;
    justify-content: space-around;
    .user_ctl_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-top: 16px;
      &:active {
        background-color: #f7f7f7;
      }
      img {
        width: 45px;
        height: 45px;
        display: block;
        margin: 0px auto;
        margin-bottom: 5px;
      }
      p {
        width: 100%;
        height: 20px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 23px;
        text-align: center;
      }
    }
  }
  .rightsandinterests_content {
    width: 345px;
    height: 41px;
    background: linear-gradient(90deg, #f9a032 0%, #f94811 100%);
    border-radius: 5px;
    display: flex;
    margin-top: 12px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 0px 15px;
    div {
      flex: 1;
      display: flex;
      p {
        width: 100%;
        height: 41px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 41px;
        text-align: left;
        cursor: pointer;
        &.title {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          &:active {
            color: #f7f7f7;
          }
        }
      }
      img {
        width: 7px;
        height: 12px;
        margin-top: 15px;
      }
    }
  }
  .user_content {
    width: 345px;
    margin: 0px auto;
    position: absolute;
    top: 0px;
    left: 50%;
    margin-left: -172px;
  }
  .user_data {
    width: 345px;
    height: 250px;
    background: #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin: 0px auto;
    margin-top: 12px;
    border: 1px solid #fff;
    .user_data_item {
      display: flex;
      padding: 0px 22px;
      position: relative;
      margin-top: 24px;
      margin-bottom: 28px;
      img {
        width: 23px;
        height: 23px;
        margin-right: 15px;
        vertical-align: top;
        &.you {
          width: 7px;
          height: 13px;
          margin-top: 3px;
          position: absolute;
          right: 22px;
          top: 0px;
        }
      }
      p {
        width: 200px;
        height: 23px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 23px;
        text-align: left;
      }
    }
  }
  .login_box {
    width: 300px;
    height: 101px;
    background: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    margin-top: -51px;
    margin-left: -150px;
    .login_box_header {
      p {
        width: 100%;
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 21px;
        text-align: center;
        margin: 15px 0px;
      }
      border-bottom: 1px solid #f7f7f7;
    }
    p {
      width: 56px;
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1452f5;
      line-height: 25px;
      text-align: center;
      margin: 0px auto;
      margin-top: 15px;
      &:active {
        color: #0439bd;
      }
    }
  }
  .total_title {
    width: 229px;
    height: 40px;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 6px;
    opacity: 0.7;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -114px;
  }
}
</style>

