<template>
  <transition :name="fadeIn">
    <div class="alertBox" v-if="show">
      <div class="alert-mask" v-if="isShowMask"></div>
      <transition :name="transform">
        <div class="show_guide" v-if="show" @click="show = !show">
          <img class="guide_path" src="../../assets/imgs/path.png" alt="" />
          <img
            class="guide_invitation"
            src="../../assets/imgs/invitation.png"
            alt=""
          />
          <div class="make_over_guild">
            <div class="m_o_g_top">
              <p class="title">公会创建成功</p>
              <p>邀请更多好友加入</p>
              <p>助力公会增长可解锁更多公会权益!</p>
            </div>
            <div class="m_o_g_bottom f18" @click="showPower">
              <p class="m_o_g_btn_p">公会等级权益 ></p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    show: {
      // 是否显示此toast
      default: false
    },
    isShowMask: {
      // 是否显示遮罩层
      default: true
    },
    time: {
      // 显示时间
      default: 1500
    },
    transition: {
      // 是否开启动画
      default: true
    },
    level: {
      default: 2
    },
    router: {
      default() {
        return {}
      }
    }
  },
  mounted() {
    // 时间控制
    /*   setTimeout(() => {
      this.show = false
    }, this.time)*/
  },
  computed: {
    transform() {
      // 根据props，生成相对应的动画
      if (!this.transition) {
        return ''
      } else {
        return 'transform'
      }
    },
    fadeIn() {
      // 同上
      if (!this.transition) {
        return ''
      } else {
        return 'fadeIn'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alertBox {
  position: fixed;
  z-index: 999;
}
.alert-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4999;
  background: rgba(0, 0, 0, 0.8);
}

.make_over_guild {
  width: 300px;
  height: auto;

  .m_o_g_top {
    width: 100%;
    padding: 10px 0 15px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;

    .title {
      font-size: 18px;
      line-height: 50px;
      color: #000000;
    }
  }

  .m_o_g_bottom {
    display: flex;
    width: 100%;
    height: 50px;

    .m_o_g_btn_left {
      width: 50%;
      height: 50px;
      line-height: 50px;
      color: #999999;
      text-align: center;
      background-color: #fff;
    }
    .m_o_g_btn_right {
      width: 50%;
      height: 50px;
      line-height: 50px;
      color: #fff;
      text-align: center;
      background-color: #1452f5;
    }
    .m_o_g_btn_p {
      width: 100%;
      line-height: 50px;
      color: #1452f5;
      text-align: center;
    }
  }
}

.show_guide {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  width: 100%;
  height: 100%;

  .guide_path {
    position: absolute;
    top: 51px;
    right: 113px;
    width: 80px;
    height: auto;
  }
  .guide_invitation {
    position: absolute;
    top: 40px;
    right: 25px;
    width: 75px;
    height: auto;
  }
  .make_over_guild {
    position: absolute;
    top: 25%;
    left: 50%;
    overflow: hidden;
    background: #fff;
    border-radius: 20px;
    transform: translateX(-50%);
  }
}

.fadeIn-enter-active {
  animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.transform-enter-active {
  transform-origin: 50% 50%;
  animation: sizeScale 1s;
}
@keyframes sizeScale {
  0% {
    transform: scale(0.5);
  }
  70% {
    transform: scale(1.2);
  }
}
</style>
