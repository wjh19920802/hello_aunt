<template>
  <div class="home_content">
     <textarea placeholder="请输入您的建议，非常感谢"  v-model="content" ></textarea>
    <div class="btn" @click="feedbacksaveData" >提交</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast)
import {feedbacksave} from '../../../api/info'
import logo from "../../../assets/imgs/logo_nihao.png";

export default {
  name: "userCenter",

  data() {
    return {
      logo: logo,
      content:""
    };
  },
  mounted() {
     this.content="";
  },
  methods: {
    feedbacksaveData(){
      if(this.content==""){
        Toast('请输入反馈内容！');
        return ;
      }
      let that=this;
      let params={
         content:this.content
      }
       feedbacksave(params).then(function (res) {
        if (res.result == 0) {
          Toast('反馈内容提交成功！');
          setTimeout(function(){
             that.routerGO();
          },300)
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
  textarea {
    width: 345px;
    height: 300px;
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #1452F5;

    margin: 0px auto;
    margin-top: 15px;
    margin-bottom: 170px;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 21px;
    box-sizing: border-box;
    padding:10px;
  }
  .btn {
    width: 335px;
    height: 47px;
    background: #1452f5;
    border-radius: 24px;
    border: 1px solid rgba(5, 5, 5, 0.08);

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