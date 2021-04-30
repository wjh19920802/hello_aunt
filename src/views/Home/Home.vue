<template>
  <div id="home-wrap" class="ig_tab_content_wrap" ref="home">
    <Tab
      :tabData="tabData"
      :active.sync="activeIndex"
    />
  </div>
</template>
<script>
import { Toast } from 'vant'
import Tab from 'components/Home/Tab'
import { homeTab } from '@/api/home'
export default {
  name: 'Home',
  components: {
    Tab
  },
  data() {
    return {
      tabData: [], // tab栏列表
      activeIndex: 0 // tab栏当前索引
    }
  },
  watch: {
    activeIndex(newVal, oldVal) {
      const tabScroll = JSON.parse(
        JSON.stringify(this.$store.state.home.tabScroll)
      )
      tabScroll[oldVal].isCurrent = false
      tabScroll[newVal].isCurrent = true
      this.$store.dispatch('home/SetTabScroll', tabScroll)
      this.$nextTick(() => {
        document.querySelector('#home-wrap').scrollTop =
          tabScroll[newVal].scroll
      })
    }
  },
  computed: {},
  mounted() {
    this.init()
    // this.$upgradeModal.show()
  },
  methods: {
    init() {
      this.homeTab()
    },
    async homeTab() {
      const res = await homeTab()
      if (res.result === '0') {
        const tabData = [
          {
            tabId: 1,
            tabTitle: '推荐'
          }
          /*     {
            tabId: 2,
            tabTitle: '视频'
          }*/
        ]
        this.tabData = tabData.concat(res.data.homeTabs)
        const tabScroll = []
        this.tabData.forEach((item, index) => {
          if (index === 0) {
            tabScroll.push({
              isCurrent: true,
              scroll: 0
            })
          } else {
            tabScroll.push({
              isCurrent: false,
              scroll: 0
            })
          }
        })
        this.$store.dispatch('home/SetTabScroll', tabScroll)
      }
    }
  },
  activated() {
    const tabScroll = JSON.parse(
      JSON.stringify(this.$store.state.home.tabScroll)
    )
    document.querySelector('#home-wrap').scrollTop =
      tabScroll[this.activeIndex].scroll
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(
      'home/SetHomeScroll',
      document.querySelector('#home-wrap').scrollTop
    )
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      document.querySelector('#home-wrap').scrollTop =
        vm.$store.state.home.homeScroll
    })
  }
}
</script>

<style lang="scss" scoped>
#home-wrap {
  .content-wrap {
    width: 100%;
    height: auto;
    padding: 15px 15px 11px;
    box-sizing: border-box;
  }
}
</style>
