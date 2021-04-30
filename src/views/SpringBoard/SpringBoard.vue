<template>
  <div id="spring_board">
    <van-image class="logo" fit="cover" :src="logo" />
    <div class="auth_btn bg_linear-gradient" @click="toHome">
      <svg-icon icon-class="wechat" class="wechat"></svg-icon>
      <span>微信登录</span>
    </div>

  </div>
</template>

<script>
import logo from '@/assets/imgs/logo.png'
import store from '@/store'
import { getUrlParame } from '@/utils/index'
import { login } from '@/api/app'
export default {
  name: 'SpringBoard',
  data() {
    return {
      logo: logo
    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    toHome() {
      this.$router.replace({
        name: 'Home'
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(111)
    next()
  }
}
</script>

<style lang="scss" scoped>
#spring_board {
  width: 100%;
  height: 100%;
  background-image: $cdn;
  .logo {
    width: 50%;
    height: auto;
    margin: 120px auto 136px;
  }

  .auth_btn {
    width: calc(100% - 40px);
    height: 47px;
    margin: 0 auto;
    line-height: 47px;
    text-align: center;
    border-radius: 24px;

    /deep/.van-button__text {
      display: flex;
      align-items: center;
    }

    .wechat {
      margin-right: 10px;
      font-size: 36px;
      color: #fff;
      vertical-align: -10px;
    }

    span {
      font-family: PingFangSC;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
