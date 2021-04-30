<template>
  <div class="customerService_data">
    <div class="customerService_content">
      <div
        class="customerService_item"
        v-for="(row, index) in list"
        :key="index"
      >
        <div v-if="row.isSelf == true">
          <img :src="row.icon" />
          <p>{{ row.title }}</p>
        </div>
        <div v-else class="self">
          <p>{{ row.title }}</p>
          <img :src="row.icon" />
        </div>
      </div>
    </div>
    <div class="customerService_bottom">
      <input />
      <div>发表</div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/api/user";
import kefu from "../../../assets/imgs/kefu.png";

export default {
  name: "userCenter",

  data() {
    return {
      kefu,
      list: [
        {
          isSelf: true,
          icon: kefu,
          title: "您好，有问题可以随时向我提问哦~",
        },
        {
          isSelf: false,
          icon: kefu,
          title: "您好，有问题可以随时向我提问哦~您好，有问题可以随时向我提问哦~您好，有问题可以随时向我提问哦~",
        },
        {
          isSelf: true,
          icon: kefu,
          title: "您好，有问题可以随时向我提问哦~",
        },
        {
          isSelf: false,
          icon: kefu,
          title: "您好，有问题可以随时向我提问哦~您好，有问题可以随时向我提问哦~",
        },
        {
          isSelf: true,
          icon: kefu,
          title: "您好，有问题可以随时向我提问哦~",
        },
      ],
    };
  },
  mounted() {
    getUserInfo();
  },
  methods: {
    routerGO() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.customerService_data {
  .customerService_content {
    box-sizing: border-box;
    padding: 0px 15px;
    .customerService_item {
      margin-top: 17px;
      div {
        display: flex;
        &.self{
            img{
                margin-left:15px;
                margin-right: 0px;
            }
        }
        img {
          width: 36px;
          height: 36px;
          margin-right: 15px;
        }
        p {
          flex: 1;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 36px;
          text-align: left;
          background: #ffffff;
          border-radius: 5px;
          box-sizing: border-box;
          padding: 0px 16px;
        }
      }
    }
  }
  .customerService_bottom {
    position: fixed;
    bottom: 0px;
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    width: 100%;

    input {
      width: 255px;
      height: 33px;
      background: #ffffff;
      border-radius: 5px;
      border: 1px solid #c5c4c4;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 33px;
      box-sizing: border-box;
      padding: 0px 5px;
    }
    div {
      width: 75px;
      height: 33px;
      background: #1452f5;
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 33px;
      margin-left: 15px;
      text-align: center;
      &:active{
           background: #0a3fc5;
      }
    }
  }
}
</style>