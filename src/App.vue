<template>
  <div id="app" class="ig-app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./store/index";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mounted() {
    // let response = {
    //   createTime: null,
    //   firstLogin: "2021-04-09 16:04:22",
    //   guildLv: null,
    //   guildName: null,
    //   id: 23,
    //   isDesc: null,
    //   joinGuildStaus: 1,
    //   joinGuildTime: null,
    //   signDays: null,
    //   signTime: null,
    //   token: "72e36556c48d31d6eb371373fd54006d",
    //   vipCity: "武清",
    //   vipContributionBalance: 0,
    //   vipContributionEarn: 0,
    //   vipGoldBalance: 15,
    //   vipGoldConsume: 0,
    //   vipGoldEarn: 15,
    //   vipGuildId: 24,
    //   vipIntroduce: "Be calm欢迎来到我个人主页，期待与你的相遇，相遇在这一刻",
    //   vipName: null,
    //   vipNick: "明天",
    //   vipOpenid: "oVOOejn6zJTXb4beg8lHXRiAdUQE",
    //   vipPhone: null,
    //   vipPic:
    //     "https://headimgurl-1305249481.cos.ap-beijing.myqcloud.com/aunt/vip//23/2021-04/7fe536f66c0e4c82a32316d0a2a1f7be.jpg",
    //   vipProvince: "天津",
    //   vipRole: 4,
    //   vipSex: 1,
    //   vipStatus: 1,
    //   vipUnionid: "ogrJh1WjcUGVJR1lfiLM84a1HixY",
    //   yn: 1,
    // };
    // const data = response;
    // const token = data.token;
    // store.dispatch("app/setUserInfo", data);
    // store.dispatch("app/setToken", token);
  },
  methods: {
    handleChange(v) {
      console.log(v);
      console.log("helloworld");
    },
  },
};
</script>

<style lang="scss">
//@import "assets/css/index.scss";
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  background-color: #f3f3f3;
}
@media screen and (min-width: 769px) {
  .ig-app {
    width: 750px !important;
    margin: 0 auto !important;
  }
}
</style>
