<template>
  <div class="home_content">
     <div class="username_item">
        <input  v-model="userName" />
        <div :class="{ active:userName.length==10 }">
            <p v-if="userName.length==10" >已达到最大字数限制</p>
            <p class="num" >{{ userName.length }}/10</p>
        </div>  
    </div>
    <div class="btn" @click="editUserInfoData" >保存</div>
  </div>
</template>

<script>
import { editUserInfo } from "@/api/info";
import user from "../../../assets/imgs/user.png";
import logo from "../../../assets/imgs/logo_nihao.png";

export default {
  name: "userCenter",

  data() {
    return {
      logo: logo,
      userName:"",
      userId:editUserInfo,
    };
  },
  mounted() {
     this.userName=this.$route.query.userName;
     this.userId=this.$route.query.userId;
  },
  watch:{
       userName(news,old){
            if(news.length>=0){
                this.userName=news.substr(0,10);
            }
       }
  },
  methods: {
    //修改用户信息
    editUserInfoData() {
      let params = {
        vipNick: this.userName,
        id:this.userId,
        token: this.$store.getters.userInfo.token,
      };
      let that = this;
      editUserInfo(params).then(function (res) {
        if (res.result == 0) {
          that.routerGO();
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
  .username_item{
       width: 345px;
       margin: 26px auto;
       margin-top:10px;
       margin-bottom: 400px;
       &:active{
            input{
                width: 345px;
                height: 41px;
                background: #FFFFFF;
                border-radius: 5px;
                border: 1px solid #1452F5;
                box-sizing: border-box;
                padding:0px 10px;
            }
       }

      input{
        width: 345px;
        height: 41px;
        background: #FFFFFF;
        border-radius: 5px;
        border: 1px solid #222222;
        box-sizing: border-box;
        padding:0px 10px;
      }
      div{
          display: flex;
          margin-top:10px;

          &.active{
             p{
                  color: #FF0000;
                  &.num{
                       color: #FF0000;
                  }
             }
             
          }
          p{
            flex: 1;
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 21px;
            text-align: left;
            &.num{
                color: #222222;
                text-align: right;
            }
          }
      }
  }
  .btn {
    width: 335px;
    height: 47px;
    background: #1452f5;
    border-radius: 24px;
    border: 1px solid rgba(5, 5, 5, 0.08);
    margin-top:400px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 47px;
    text-align: center;
    margin: 0px auto;
    &:active{
          background: #063abe;
    }
  }
}
</style>