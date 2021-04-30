<template>
  <div class="home_content">
    <div class="home_header"></div>
    <div class="user_content">
      <div class="aboutus_data">
        <img :src="logo" />
        <div v-if="isGuild">
          <h2>{{ guildName }}</h2>
          <div class="progress_bg">
            <div class="progress_data" :style="{ width: width }"></div>
          </div>
          <div class="grade_content">
            <img :src="grade1Img" />
            <p>距离升级还需{{ numberLength }}贡献值</p>
            <img :src="grade2Img" />
          </div>
        </div>
        <div v-else>
          <h2>您还没有加入公会哦~</h2>
        </div>
        <div class="rightsandinterests_content">
          <div v-if="isGuild"  @click="routerSelfTask"  >
            <img class="icon" :src="gonghui_icon" />
            <p class="title">做任务，快速提升贡献值</p>
            <img :src="qianyi" />
          </div>
          <div v-else  @click="routerGuild" >
            <img class="icon" :src="gonghui_icon" />
            <p class="title">加入公会,解锁公会权益</p>
            <img :src="qianyi" />
          </div>
        </div>
      </div>
      <div class="grade_list">
        <h3>公会等级权益</h3>
        <div class="grade_item" v-for="(row, index) in grade_list" :key="index">
          <img :src="row.icon" />
          <div>
            <h4>{{ row.num }}贡献值</h4>
            <p>{{ row.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVipInfo, getGuildInfo } from "@/api/info";
import user from "../../../assets/imgs/user.png";
import gonghui_icon from "../../../assets/imgs/gonghui_icon.png";
import logo from "../../../assets/imgs/logo_gonghui.png";
import qianyi from "../../../assets/imgs/qianyi.png";
import grade1 from "../../../assets/imgs/grade1.png";
import grade2 from "../../../assets/imgs/grade2.png";
import grade3 from "../../../assets/imgs/grade3.png";
import grade4 from "../../../assets/imgs/grade4.png";
import grade5 from "../../../assets/imgs/grade5.png";
import grade6 from "../../../assets/imgs/grade6.png";
import grade7 from "../../../assets/imgs/grade7.png";

export default {
  name: "userCenter",
  data() {
    return {
      logo: logo,
      gonghui_icon,
      grade1Img: grade1,
      grade2Img: grade2,
      numberLength: 0,
      qianyi,
      grade1,
      grade2,
      grade3,
      grade4,
      grade5,
      grade6,
      grade7,
      width: "10%",
      isGuild: false,
      vipGuildId: "",
      guildName: "",
      grade_list: [
        {
          icon: grade1,
          num: 0,
          title: "",
        },
        {
          icon: grade2,
          num: 5000,
          title: "",
        },
        {
          icon: grade3,
          num: 7000,
          title: "",
        },
        {
          icon: grade4,
          num: 10000,
          title: "",
        },
        {
          icon: grade5,
          num: 15000,
          title: "",
        },
        {
          icon: grade6,
          num: 20000,
          title: "",
        },
        {
          icon: grade7,
          num: 25000,
          title: "",
        },
      ],
    };
  },
  mounted() {
    this.getVipInfoData();
  },
  methods: {
    routerGuild() {
      this.$router.push({
        path: "/guild",
      });
    },
    routerSelfTask() {
      this.$router.push({
        path: "/self-task",
      });
    },
    getGuildInfoData(guildId) {
      let params = {
        guildId: this.vipGuildId,
        token: this.$store.getters.userInfo.token,
      };
      let that = this;
      getGuildInfo(params).then(function (res) {
        if (res.result == 0) {
          that.guildName = res.data.guildName;
          that.logo=res.data.guildPic;
          that.grade1Img = that["grade" + res.data.guildLv];
          that.grade2Img = that["grade" + (res.data.guildLv + 1)];
          that.numberLength =
            parseInt(that.grade_list[res.data.guildLv].num) -
            parseInt(res.data.guildContribution);
          that.width =
            ((res.data.guildContribution /
              that.grade_list[res.data.guildLv + 1].num) *
              100) +
            "%";
            console.log(res.data.guildContribution ,
              that.grade_list[res.data.guildLv + 1].num,  that.width);
        }
      });
    },
    getVipInfoData() {
      let params = {
        vipId: this.$store.getters.userInfo.id,
        token: this.$store.getters.userInfo.token,
      };
      let that = this;
      getVipInfo(params).then(function (res) {
        if (res.result == 0) {
          if (
            !res.data.vipGuildId &&
            typeof res.data.vipGuildId != "undefined" &&
            res.data.vipGuildId != 0
          ) {
            that.isGuild = false;
          } else {
            that.isGuild = true;
            that.vipGuildId = res.data.vipGuildId;
            that.getGuildInfoData();
          }
        }
      });
    },
    routerGO() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.home_content {
  width: 100%;
  position: absolute;
  margin: 0px auto;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: auto;
  overflow-x: hidden;
  // overflow: hidden;

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
      height: 21px;
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 21px;
      text-align: center;
      margin-top: 9px;
    }
    .progress_bg {
      width: 300px;
      height: 8px;
      background: #f2f2f2;
      border-radius: 4px;
      margin: 0px auto;
      position: relative;
      margin-top: 15px;
      margin-bottom: 9px;
      .progress_data {
        position: absolute;
        left: 0;
        top: 0px;
        width: 225px;
        height: 8px;
        background: linear-gradient(90deg, #ed17aa 0%, #1452f5 100%);
        border-radius: 4px;
      }
    }
    .grade_content {
      display: flex;
      width: 300px;
      margin: 0px auto;
      margin-bottom: 15px;
      img {
        width: 72px;
        height: 23px;
        border-radius: 0px;
        margin: 0px;
      }
      p {
        flex: 1;
        height: 23px;
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 23px;
        text-align: center;
      }
    }
    .rightsandinterests_content {
      width: 345px;
      height: 41px;
      background: linear-gradient(90deg, #f74b93 0%, #f84b8b 0%, #fd4b5f 100%);
      box-shadow: 0px -1px 5px 0px rgba(25, 81, 244, 0.2);
      border-radius: 5px;
      display: flex;
      margin-top: 18px;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 0px 15px;
      div {
        flex: 1;
        display: flex;
        p {
          width: 100%;
          height: 41px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 41px;
          text-align: left;
          cursor: pointer;
          &.title {
            font-size: 15px;
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
          &.icon {
            width: 21px;
            height: 21px;
            margin-top: 10px;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .grade_list {
    width: 345px;
    background: #ffffff;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin: 0px auto;
    margin-top: 15px;
    border-top: 1px solid #ffffff;
    border-bottom: 1px solid #ffffff;
    h3 {
      width: 100%;
      height: 21px;
      font-size: 17px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 21px;
      text-align: center;
      margin-bottom: 23px;
      margin-top: 15px;
    }
    .grade_item {
      display: flex;
      box-sizing: border-box;
      padding: 0px 42px;

      margin-bottom: 14px;
      img {
        width: 75px;
        height: 25px;
        margin-top: 0px;
        margin-right: 8px;
        border-radius: 0px;
      }
      div {
        flex: 1;
        h4 {
          width: 100px;
          height: 21px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1452f5;
          line-height: 21px;
          text-align: left;
          margin-top: 2px;
        }
        p {
          width: 172px;
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 21px;
          text-align: left;
        }
      }
    }
  }
}
</style>