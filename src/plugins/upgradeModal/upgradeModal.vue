<template>
  <transition :name="fadeIn">
    <div class="alertBox" v-if="show">
      <div class="alert-mask" v-if="isShowMask"></div>
      <transition :name="transform">
        <div class="box" v-if="show">
          <div class="box_top">
            <img src="@/assets/imgs/modal_top.png" />
            <div class="box_title f18">
              <p>恭喜您</p>
              <p>您的公会已升级至LV{{ level }}</p>
            </div>
          </div>
          <div class="box_content">
            <p class="box_content_title f17">
              公会 lv{{ level }} 享有以下权益：
            </p>
            <ul class="box_content_list">
              <li class="box_content_item f15">
                <p>广场舞视频资料一份</p>
              </li>
              <li class="box_content_item f15">
                <p>广场舞视频资料一份</p>
              </li>
              <li class="box_content_item f15">
                <p>广场舞视频资料一份</p>
              </li>
            </ul>
          </div>
          <div class="box_btn" @click="show = !show">确定</div>
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
.box {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5000;
  width: 300px;
  height: 334px;
  margin-top: -167px;
  margin-left: -150px;
  overflow: hidden;
  text-align: center;
  background: #ffffff;
  border-radius: 10px;

  .box_top {
    position: relative;
    width: 100%;
    height: auto;

    img {
      width: 100%;
      height: auto;
    }

    .box_title {
      position: absolute;
      top: 21px;
      left: 22px;
      line-height: 25px;
      color: #ffffff;
      text-align: left;
    }
  }

  .box_content {
    width: 100%;
    padding: 15px 22px 22px;
    box-sizing: border-box;

    .box_content_title {
      margin-bottom: 15px;
      font-weight: bold;
      line-height: 20px;
      color: #222222;
      text-align: left;
    }

    .box_content_list {
      width: 100%;

      .box_content_item {
        width: 80%;
        height: 30px;
        margin: 0 auto 5px;
        color: #222222;
        background: #ffd96b;
        border-radius: 19px;

        p {
          width: 100%;
          height: 100%;
          line-height: 30px;
        }
      }
    }
  }

  .box_btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    color: #1452f5;
    text-align: center;
    border-top: 1px solid #e5e5e5;
  }
}
.fadeIn-enter-active {
  animation: fadeIn 0.3s ease-in;
}
.fadeIn-leave-active {
  animation: fadeOut 0.3s ease-in;
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
