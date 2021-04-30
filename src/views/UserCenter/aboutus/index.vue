<template>
  <div class="home_content">
    <div class="home_header"></div>
    <div class="user_content">
      <div class="aboutus_data">
        <img :src="logo" />
        <h2>你好大妈</h2>
        <div>
          <p>微信公众号</p>
          <p class="title">你好大妈</p>
        </div>
        <div>
          <p>微信号</p>
          <p class="title">nhdm888</p>
        </div>

        <div class="qrcode_content">
          <img :src="gzgzh" />
          <p>微信扫一扫 关注公众号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import user from '../../../assets/imgs/user.png'
import logo from '../../../assets/imgs/logo_nihao.png'
import gzgzh from '../../../assets/imgs/gzgzh.png'

export default {
  name: 'UserCenter',

  data() {
    return {
      logo: logo,
      gzgzh
    }
  },
  mounted() {
    getUserInfo()
  },
  methods: {
    routerGO() {
      this.$router.go(-1)
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
    border-bottom-right-radius: 0%;
    border-bottom-left-radius: 0%;
  }

  .user_content {
    width: 345px;
    margin: 0px auto;
    position: absolute;
    top: 44px;
    left: 50%;
    margin-left: -172px;
  }
  .aboutus_data {
    width: 345px;
    height: 1102px;
    background: #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin: 0px auto;
    margin-top: 13px;
    border: 1px solid #fff;

    img {
      width: 68px;
      height: 68px;
      margin: 0px auto;
      margin-top: -34px;
      border: 0px;
      border-radius: 50%;
    }
    h2 {
      width: 100%;
      height: 20px;
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1452f5;
      line-height: 20px;
      text-align: center;
      padding: 12px 0px;
    }
    div {
      width: 315px;
      margin: 0px auto;
      display: flex;
      border-bottom: 1px solid #f8f8f8;
      padding: 11px 0px;
      justify-content: space-between;
      p {
        width: 165px;
        height: 18px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 18px;
        text-align: left;
        flex: 1;
        &.title {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 18px;
          text-align: right;
        }
      }
    }
    .qrcode_content {
      margin-top: 45px;
      display: flex;
      flex-direction: column;
      border-bottom: 0px;
      img {
        width: 135px;
        height: 135px;
        display: block;
        margin: 0px auto;
        margin-bottom: 15px;
        border-radius: 0px;
      }
      p {
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 20px;
        text-align: center;
      }
    }
  }
}
</style>
