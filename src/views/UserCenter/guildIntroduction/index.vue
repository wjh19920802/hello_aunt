<template>
  <div class="home_content">
     <div class="username_item">
        <textarea  v-model="userIntroduce" ></textarea>
        <div :class="{ active:userIntroduce.length==100 }">
            <p v-if="userIntroduce.length==100" >已达到最大字数限制</p>
            <p class="num" >{{ userIntroduce.length }}/100</p>
        </div>
    </div>
    <div class="btn" @click="editUserInfoData" >保存</div>
  </div>
</template>

<script>
import { editUserInfo } from '@/api/info'
import user from '../../../assets/imgs/user.png'
import logo from '../../../assets/imgs/logo_nihao.png'

export default {
  name: 'GuildIntroduction',

  data() {
    return {
      logo: logo,
      userIntroduce: '',
      userId: ''
    }
  },
  mounted() {
    this.userIntroduce = this.$route.query.userIntroduce
    this.userId = this.$route.query.userId
  },
  watch: {
    userIntroduce(news, old) {
      if (news.length >= 100) {
        this.userIntroduce = news.substr(0, 100)
      }
    }
  },
  methods: {
    // 修改用户信息
    editUserInfoData() {
      const params = {
        vipIntroduce: this.userIntroduce,
        id: this.userId,
        token: this.$store.getters.userInfo.token
      }
      const that = this
      editUserInfo(params).then(function(res) {
        if (res.result == 0) {
          that.routerGO()
        }
      })
    },
    routerGO() {
      this.$router.go(-1)
    }

  }
}
</script>

<style lang="scss" scoped>
.home_content {
  .username_item{
       width: 345px;
       margin: 26px auto;
       margin-top:10px;
       margin-bottom: 200px;
       &:active{
            textarea{
                width: 345px;
                height: 225px;
                background: #FFFFFF;
                border-radius: 5px;
                border: 1px solid #1452F5;
                box-sizing: border-box;
                padding:10px;
            }
       }

      textarea{
        width: 345px;
        height: 225px;
        background: #FFFFFF;
        border-radius: 5px;
        border: 1px solid #222222;
        box-sizing: border-box;
        padding:10px;
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
