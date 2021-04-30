<template>
  <div class="invitation_content">
    <!-- 指示图片 -->
    <div class="totat_content" v-if="isTotal" @click="setTotal">
      <div class="total_bg"></div>
      <img :src="liujing" />
      <div class="totat_data">
        <p>点击右上角，发送给朋友或分享到朋友圈，邀请好友加入公会！</p>
        <img :src="img_9938" />
      </div>
    </div>
    <!-- 提示 -->
    <div class="total_title" v-if="total_title">图片已保存到本地相册！</div>
    <div class="invitation_data" id="html2canvas" ref="html2canvas">
      <div class="invitation_title">
        <img class="user_img" :src="user" />
        <h2>{{ userName }}</h2>
        <h3><img class="user_icon" :src="shoushoushi" />扫描下方二维码</h3>
        <p>关注你好大妈公众号</p>
        <p>和我一起加入公会，领取公会福利吧！</p>
        <div class="ewm_data">
          <img id="qrCode" :src="codeImg" ref="qrCodeDiv" />
          <!-- <div id="qrCode"   ref="qrCodeDiv" ></div> -->
        </div>
      </div>
    </div>

    <button class="invitation_ctl" @click="saveImage('html2canvas', userName)">
      保存图片
    </button>

    <div class="invitation_imgContent" v-if="isSaveImg">
      <div class="invitaion_img_data">
        <img class="invitaion_img_close" :src="close" @click="hideImg()" />
        <img class="invitaion_img" :src="imgSavesrc" id="invitaion_img" />
      </div>
      <p>请您长按图片，保存到手机！</p>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import user from "../../../assets/imgs/user.png";
import shoushoushi from "../../../assets/imgs/shoushoushi.png";
import close from "../../../assets/imgs/close_img.png";
import liujing from "../../../assets/imgs/lujing.png";
import img_9938 from "../../../assets/imgs/IMG_9938.png";
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
import { Toast } from "vant";
import { getQrCode, getVipInfo } from "../../../api/info";
export default {
  name: "Invitation",
  data() {
    return {
      isTotal: false,
      total_title: false,
      user: user,
      liujing: liujing,
      img_9938: img_9938,
      shoushoushi: shoushoushi,
      userName: "",
      codeImg: "",
      isSaveImg: false,
      imgSavesrc: "",
      close: close,
    };
  },
  mounted() {
    // this.setQRcode();
    wx.hideOptionMenu();
    this.getQrCodeData();
    this.getVipInfoData();
  },
  methods: {
    getVipInfoData() {
      const params = {
        vipId: this.$route.query.userid,
        token: this.$store.getters.userInfo.token,
      };
      const that = this;
      getVipInfo(params).then(function (res) {
        if (res.result == 0) {
          that.userName = res.data.vipNick;
          that.title = "请点击头像获取信息";
          var image = new Image();
          image.crossOrigin = "anonymous";
          image.src = res.data.vipPic;
          image.onload = function () {
            that.user = that.getBase64Image(image);
          };
        }
      });
    },

    setTotal() {
      this.isTotal = false;
    },
    routerGO() {
      this.$router.go(-1);
    },
    showTotalTitle() {
      this.total_title = true;
      const _that = this;
      setTimeout(function () {
        _that.total_title = false;
      }, 1000);
    },

    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
      var dataURL = canvas.toDataURL("image/" + ext);
      return dataURL;
    },

    getQrCodeData() {
      const that = this;
      getQrCode().then(function (res) {
        console.log("获取团长分享的二维码", res);
        if (res.result == 0) {
          that.codeImg = res.data;
        }
      });
    },
    setQRcode() {
      new QRCode(this.$refs.qrCodeDiv, {
        text: "https://www.baidu.com",
        width: 90,
        height: 90,
        colorDark: "#333333", // 二维码颜色
        colorLight: "#ffffff", // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L, // 容错率，L/M/H
      });
    },
    // 图片格式转换方法
    dataURLToBlob(dataurl) {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    hideImg() {
      this.isSaveImg = false;
    },
    // 点击方法
    saveImage(divText, imgText) {
      Toast.loading({
        forbidClick: true,
        duration: 0,
      });
      const canvasID = this.$refs[divText];
      const _that = this;
      const a = document.createElement("a");
      let img = new Image();
      img.src = this.user;
      img.onload = function () {
        html2canvas(canvasID, {
          allowTaint: true,
          taintTest: false,
          scrollY: 0,
          scrollX: 0,
          useCORS: true, // 火狐浏览器添加项
        }).then((canvas) => {
          const img = new Image();
          _that.imgSavesrc = canvas.toDataURL("image/png");
          Toast.clear();
          _that.isSaveImg = true;
          // 显示提示
          // _that.showTotalTitle();
        });
      };
    },
    base64ToBlob(urlData, type) {
      const arr = urlData.split(",");
      const mime = arr[0].match(/:(.*?);/)[1] || type;
      // 去掉url的头，并转化为byte
      const bytes = window.atob(arr[1]);
      // 处理异常,将ascii码小于0的转换为大于0
      const ab = new ArrayBuffer(bytes.length);
      // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
      const ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], {
        type: mime,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.invitation_content {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  border-top: 1px solid #f7f7f7;
}
.invitation_data {
  width: 335px;
  height: 373px;
  border-top: 1px solid #f7f7f7;
  background: linear-gradient(90deg, #ed17aa 0%, #1452f5 100%);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  margin: 0px auto;
  margin-top: 15px;
  border: 1px solid #f3f3f3;
  .invitation_title {
    width: 315px;
    height: 300px;
    background: #ffffff;
    border-radius: 24px;
    margin: 0px auto;
    margin-top: 59px;
    border: 1px solid #ffffff;
    .user_img {
      width: 67px;
      height: 67px;
      border: 2px solid #ffffff;
      border-radius: 50%;
      display: block;
      background-color: #ffffff;
      margin: 0px auto;
      margin-top: -35px;
    }
    h2 {
      width: 300px;
      height: 25px;
      font-size: 18px;
      text-align: center;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 25px;
      margin: 15px auto;
    }
    h3 {
      width: 200px;
      text-align: center;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 20px;
      margin: 0px auto;
      margin-bottom: 9px;
      vertical-align: top;
      img {
        vertical-align: top;
        width: 14px;
        height: 16px;
        margin-right: 8px;
      }
    }
    p {
      width: 267px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 22px;
      text-align: center;
      margin: 0px auto;
      padding: 0px;
    }
    .ewm_data {
      width: 105px;
      height: 105px;
      background: #ffffff;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
      margin: 0px auto;
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      #qrCode {
        width: 95px;
        height: 97px;
        margin: 0px auto;
      }
    }
  }
}
.invitation_ctl {
  width: 335px;
  height: 47px;
  background: #1452f5;
  border-radius: 24px;
  border: 1px solid rgba(5, 5, 5, 0.08);
  margin: 0px auto;
  margin-top: 114px;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 47px;
  border: 0px;
  text-align: center;
}
.totat_content {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 100;
  .total_bg {
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.6);
    z-index: 120;
  }
  img {
    width: 55px;
    height: 78px;
    position: absolute;
    right: 25px;
    z-index: 150;
    top: 11px;
  }
  .totat_data {
    width: 300px;
    height: 150px;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #979797;
    margin: 0px auto;
    z-index: 150;
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: 102px;
    p {
      width: 271px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 20px;
      margin: 0px auto;
      margin-top: 20px;
    }
    img {
      position: relative;
      right: 0;
      top: 0;
      width: 106px;
      height: 55px;
      margin: 0px auto;
      margin-top: 15px;
    }
  }
}
.total_title {
  width: 228px;
  height: 41px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 6px;
  opacity: 0.7;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 41px;
  text-align: center;
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -115px;
}
.invitation_imgContent {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  p {
    color: #ffffff;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    margin-top: 21px;
  }
  .invitaion_img_data {
    width: 335px;
    height: 378px;
    margin-top: 79px;
    position: relative;
    .invitaion_img_close {
      position: absolute;
      width: 30px;
      height: 30px;
      left: 50%;
      margin-left: -15px;
      top: 450px;
    }
    .invitaion_img {
      width: 335px;
      height: 373px;
      border-radius: 20px;
    }
  }
}
</style>
