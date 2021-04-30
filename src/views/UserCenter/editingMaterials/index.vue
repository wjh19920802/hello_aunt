<template>
  <div class="home_content">
    <div class="home_header"></div>
    <div class="user_content">
      <div class="aboutus_data">
        <img class="logo" :src="logo" />
        <van-uploader :after-read="afterRead">
          <h2>点击更换头像</h2>
        </van-uploader>
        <div @click="routerUserName">
          <p>用户名</p>
          <div class="data">
            <p class="title">{{ userName }}</p>
            <img :src="you" />
          </div>
        </div>
        <div>
          <p>地区</p>
          <div class="data" @click="addressShow = true">
            <p class="title">{{ vipProvince }}{{ vipCity }}</p>
            <img :src="you" />
          </div>
        </div>
        <div>
          <p>性别</p>
          <div class="data" @click="sexShow = true">
            <p class="title">{{ sex_img == 1 ? "男" : "女" }}</p>
            <img :src="you" />
          </div>
        </div>
        <div class="guild_introduction">
          <p>个人简介</p>
          <div class="data" @click="routerGuildIntroduction">
            <p class="title"></p>
            <img :src="you" />
          </div>
        </div>
        <p class="guild_introduction_p">{{ userIntroduce }}</p>
      </div>
    </div>

    <van-popup v-model="addressShow" round position="bottom">
      <van-cascader
        v-model="cascaderValue"
        title="请选择所在地区"
        active-color="#1452F5"
        :options="options"
        @close="addressShow = false"
        @finish="onFinish"
      />
    </van-popup>
    <van-action-sheet v-model="sexShow" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { getVipInfo, editUserInfo } from '@/api/info'
import you from '../../../assets/imgs/you.png'
import logo from '../../../assets/imgs/logo_nihao.png'
import { uploadFile } from 'api/upload'
import Vue from 'vue'
import { Cascader, Popup, ActionSheet } from 'vant'
import { area } from '../../../utils/area'
Vue.use(Cascader)
Vue.use(Popup)

Vue.use(ActionSheet)
import { imgPreview } from '../../../utils/img'
export default {
  name: 'UserCenter',
  data() {
    return {
      logo: logo,
      userName: '',
      userId: '',
      userIntroduce: '',
      userAddress: '',
      vipProvince: '',
      vipCity: '',
      sex_img: '',
      you,
      addressShow: false,
      fieldValue: '',
      cascaderValue: '',
      // 选项列表，children 代表子选项，支持多级嵌套
      options: area,
      sexShow: false,
      sex: '',
      actions: [
        { name: '男', value: 1 },
        { name: '女', value: 2 }
      ]
    }
  },
  mounted() {
    this.getVipInfoData()
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      imgPreview(file.file, this.updataImg)
    },
    async updataImg(file) {
      const formData = new FormData()
      formData.append('files', file)
      const res = await uploadFile(formData)
      if (res.result === '0') {
        this.logo = res.data[0].url
        this.editUserInfoData()
      }
      console.log(res)
    },
    getVipInfoData() {
      const params = {
        vipId: this.$route.params.userId,
        token: this.$store.getters.userInfo.token
      }
      const that = this
      getVipInfo(params).then(function(res) {
        if (res.result == 0) {
          that.userName = res.data.vipNick
          that.userId = res.data.id
          that.logo = res.data.vipPic
          that.userIntroduce = res.data.vipIntroduce
          that.vipProvince = res.data.vipProvince
          that.vipCity = res.data.vipCity
          that.sex_img = res.data.vipSex
        }
      })
    },
    // 修改用户信息
    editUserInfoData() {
      const params = {
        vipNick: this.userName,
        vipSex: this.sex_img,
        vipIntroduce: this.userIntroduce,
        token: this.$store.getters.userInfo.token,
        vipProvince: this.vipProvince,
        vipCity: this.vipCity,
        vipPic: this.logo
      }
      const that = this
      editUserInfo(params).then(function(res) {
        if (res.result == 0) {
        }
      })
    },
    routerGO() {
      this.$router.go(-1)
    },
    routerUserName() {
      this.$router.push({
        path: '/username',
        query: {
          userId: this.userId,
          userName: this.userName
        }
      })
    },
    routerGuildIntroduction() {
      this.$router.push({
        path: '/guildIntroduction',
        query: {
          userId: this.userId,
          userIntroduce: this.userIntroduce
        }
      })
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      console.log('onFinish', selectedOptions)
      this.addressShow = false
      this.vipProvince = selectedOptions[0].text
      this.vipCity = selectedOptions[1].text
      this.editUserInfoData()
      // this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.sexShow = false
      this.sex_img = item.value
      this.editUserInfoData()
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
    height: 404px;
    background: #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin: 0px auto;
    margin-top: 13px;
    border: 1px solid #fff;

    img.logo {
      width: 68px;
      height: 68px;
      margin: 0px auto;
      margin-top: -34px;
      border: 0px;
      border-radius: 50%;
    }
    h2 {
      width: 315px;
      height: 20px;
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #1452f5;
      line-height: 20px;
      text-align: center;
      padding: 12px 0px;
    }
    .guild_introduction_p {
      width: 100%;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 25px;
      box-sizing: border-box;
      padding: 0px 15px;
      text-align: left;
    }
    div {
      width: 315px;
      margin: 0px auto;
      display: flex;
      border-bottom: 1px solid #f8f8f8;
      padding: 11px 0px;
      justify-content: space-between;
      &.guild_introduction {
        border-bottom: 0px;
        padding-bottom: 5px;
      }
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
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .data {
        width: 115px;
        margin: 0px auto;
        display: flex;
        border-bottom: 0px;
        padding: 0px;
        justify-content: flex-end;
      }
      img {
        width: 7px;
        height: 13px;
        margin-top: 3px;
        border: 0;
        border-radius: 0%;
        margin-left: 12px;
      }
    }
  }
}
</style>
