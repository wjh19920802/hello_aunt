<template>
  <div>
    <van-tabs
      class="ig-vab-tabs"
      ref="tab"
      v-model="activeIndex"
      color="#fff"
      title-active-color="#fff"
      title-inactive-color="#fff"
      sticky
      swipeable
      lazy-render
      background="linear-gradient(90deg, #ED17AA 0%, #4545E4 78%, #1452F5 100%)"
      @change="changeTab"
      @scroll="scroll"
      :before-change="beforeChange"
    >
      <van-tab
        v-for="(item, index) in tabData"
        :title="item.tabTitle"
        :key="index"
      >
        <keep-alive>
          <!--  设置组件的ref  -->
          <component
            :link="`show-component-link${index}`"
            :key="key"
            v-bind:is="currentTabComponent"
            :tab-id="item.tabId"
          ></component>
        </keep-alive>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Recommend from '@/components/Home/Recommend'
import Common from '@/components/Home/CommonContent'
export default {
  name: 'Tab',
  components: {
    Recommend,
    Common
  },
  props: {
    tabData: {
      type: Array,
      default() {
        return []
      }
    },
    active: {
      type: Number,
      default: 0
    }
  },
  computed: {
    currentTabComponent() {
      if (this.activeIndex === 0) {
        return Recommend
      } else {
        return Common
      }
    },
    key() {
      return this.$store.state.home.key
    }
  },
  watch: {
    active(val) {
      this.activeIndex = val
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  mounted() {
    window.addEventListener('orientationchange', () => {
      this.$refs['tab'].resize()
    })
  },
  methods: {
    changeTab(i) {
      const keyList = this.$store.state.home.keyList
      this.$store.dispatch('home/SetKey', keyList[i])
      this.$emit('update:active', this.activeIndex)
    },
    beforeChange(i) {
      console.log(this.activeIndex)
      const prevKey = this.$store.state.home.key
      const keyList = this.$store.state.home.keyList
      keyList[this.activeIndex] = prevKey
      this.$store.dispatch('home/SetKeyList', keyList)
      return true
    },
    scroll(v) {
      const activeIndex = this.activeIndex
      const scroll = document.querySelector('#home-wrap').scrollTop
      const tabScroll = JSON.parse(
        JSON.stringify(this.$store.state.home.tabScroll)
      )
      Object.keys(tabScroll).forEach(item => {
        tabScroll[item].isCurrent = false
        if (item == activeIndex) {
          tabScroll[item] = {
            isCurrent: true,
            scroll: scroll
          }
        }
      })
      this.$store.dispatch('home/SetTabScroll', tabScroll)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.van-sticky {
  z-index: 999 !important;
  width: 100%;
}
.ig-vab-tabs {
  @media screen and (min-width: 769px) {
    /deep/.van-sticky {
      width: 750px !important;
      margin: 0 auto !important;
    }
  }
}
.ig-vab-tabs /deep/.van-tabs__wrap {
  height: 60px;
  border-radius: 0 0 20px 20px;

  .van-tabs__nav {
    padding-bottom: 15px !important;
    border: none;
    border-radius: 0 0 0.53333rem 0.53333rem;

    .van-tab__text {
      font-size: 16px;
      font-weight: bold;
    }

    .van-tabs__line {
      bottom: 22px;
    }

    .van-tab--active {
      .van-tab__text {
        font-size: 18px;
      }
    }
  }
}
/deep/.van-tabs__line {
  width: 30px !important;
  height: 4px !important;
}
</style>
