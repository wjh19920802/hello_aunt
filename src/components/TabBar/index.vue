<template>
  <div>
    <van-tabbar
      fixed
      class="tabbar-wrap ig-tabbar-wrap"
      v-model="active"
      inactive-color="#c5c4c4"
      active-color="#ED17AA"
      :border="false"
      @change="handleChange"
    >
      <template v-for="(item, index) in tabdata">
        <van-tabbar-item
          v-if="item.name != '+' && item.isShow"
          ref="slot"
          :icon="item.icon"
          :to="{ name: item.name }"
          :key="index"
          @click="tab(index, item)"
        >
          <div class="red_title" v-if="item.title == '消息' && isNum"></div>
          <span>{{ item.title }}</span>
          <template slot="icon">
            <svg-icon
              :icon-class="item.icon"
              style="font-size: 30px"
              :class="{ rocket: item.type == 2 }"
            ></svg-icon>
          </template>
        </van-tabbar-item>
        <div
          v-if="item.name == '+'"
          class="release ig-release"
          @click="showPublishwrap"
        >
          <svg-icon icon-class="publish" class="publish_icon"></svg-icon>
        </div>
      </template>
    </van-tabbar>
  </div>
</template>
<script>
import store from '@/store'

export default {
  name: 'TabBar',
  props: {
    tabdata: {
      type: Array,
      default: () => {
        return [
          {
            name: 'Home',
            title: '首页',
            icon: 'home',
            isNum: false,
            isShow: true
          },
          {
            name: 'Guild',
            title: '公会',
            icon: 'guild',
            isNum: false,
            isShow: true
          },
          {
            name: '+',
            title: '+',
            isNum: false
          },
          {
            name: 'Message',
            title: '消息',
            icon: 'message_tab',
            isNum: false,
            isShow: true
          },
          {
            name: 'UserCenter',
            title: '我的',
            icon: 'user-center',
            isNum: false,
            isShow: true
          }
        ]
      }
    }
  },
  computed: {
    tabScroll() {
      return this.$store.state.home.tabScroll
    },
    i() {
      return this.$store.state.home.tabScroll.findIndex(item => {
        return item.isCurrent
      })
    },
    getMessageNum(){
       return  this.$store.getters.messageNum;
    }
  },
  watch: {
    getMessageNum:{
      handler(val){
        this.isNum=val;
      },
      immediate:true,
      deep:true,
    },
    $route(val) {
      // 路由变化时获取缓存的最近一次点击的菜单页，浏览器返回时高亮之前的菜单页
      this.active = this.$store.state.app.active
      const that = this
      console.log('获取是否有新消息', this.$store.getters.messageNum)
      setTimeout(function() {
        that.isNum = that.$store.getters.messageNum
      }, 1000)
      setTimeout(function() {
        that.isNum = that.$store.getters.messageNum
      }, 2000)
      setTimeout(function() {
        that.isNum = that.$store.getters.messageNum
      }, 3000)
    },
    tabScroll: {
      handler(val) {
        const current = val.find(item => {
          return item.isCurrent
        })
        if (current.scroll > 20) {
          this.tabdata.splice(0, 1, {
            icon: 'rocket',
            isNum: false,
            isShow: true,
            type: 2
          })
        } else {
          this.tabdata.splice(0, 1, {
            name: 'Home',
            title: '首页',
            icon: 'home',
            isNum: false,
            isShow: true
          })
        }
      },
      deep: true
    }
  },
  data() {
    return {
      active: 0,
      currIndex: 0,
      isNum: false
    }
  },
  beforeMount() {
    this.active = this.$store.state.app.active
  },
  methods: {
    handleChange(value) {
      this.tabdata.splice(0, 1, {
        name: 'Home',
        title: '首页',
        icon: 'home',
        isNum: false,
        isShow: true
      })
    },
    tab(index, item) {
      if (item.type === 2) {
        document.querySelector('#home-wrap').style.overflow = 'hidden'
        this.scrollTop(0, 0)
        setTimeout(() => {
          document.querySelector('#home-wrap').style.overflow = 'auto'
        }, 500)
      } else if (index === 0 && this.$store.state.app.active === 0) {
        this.$nextTick(() => {
          const vm = this.getLinkComponent(`show-component-link${this.i}`)
          vm.refreshing = true
          vm.onRefresh()
        })
      }
    },
    scrollTop(number, time) {
      if (!time) {
        document.querySelector('#home-wrap').scrollTop = number
        return
      }
      const spacingTime = 1 // 设置循环的间隔时间  值越小消耗性能越高
      let spacingInex = time / spacingTime // 计算循环的次数
      let nowTop = document.querySelector('#home-wrap').scrollTop // 获取当前滚动条位置
      const everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
      const scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
          spacingInex--
          this.scrollTop((nowTop += everTop))
        } else {
          clearInterval(scrollTimer) // 清除计时器
        }
      }, spacingTime)
    },
    showPublishwrap() {
      this.$store.dispatch('app/setShowPublishWrap', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul {
  padding: 0;
  list-style-type: none;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.van-tabbar-item {
  position: relative;
}
.ig-tabbar-wrap {
  height: 63px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.05);
}
/deep/.tabbar-wrap {
  right: 0;
  left: 0;
  z-index: 999;
  overflow: hidden;

  /deep/.tabbar-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .release {
    position: relative;
    display: flex;
    width: 80px;
    justify-content: space-around;
    align-items: center;
  }
  .red_title {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 8px;
    height: 8px;
    background-color: #ff0000;
    border-radius: 50%;
  }
  .ig-release {
    height: 63px;
  }
}
@media screen and (min-width: 769px) {
  /deep/.ig-tabbar-wrap {
    width: 750px !important;
    margin: 0 auto !important;
  }
}
.rocket {
  font-size: 40px !important;
}
.publish_icon {
  font-size: 50px;
  color: #ed17aa;
}
</style>
