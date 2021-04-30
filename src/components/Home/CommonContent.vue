<template>
  <div id="common_content">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="content_item"
          v-for="(item, index) in list"
          :key="index"
          @click="linkTo(item.contentSkipLink)"
        >
          <van-image class="item_image" :src="item.contentFileLink"></van-image>
          <div class="item_see" v-if="isLink(item.contentSkipLink)">
            <span class="item_see_text">去看看</span>
            <span class="right_arrow"></span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { sleep } from '@/utils'
import { homeTabContent } from '@/api/home'
export default {
  name: 'CommonContent',
  components: {},
  props: {
    tabId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      loading: false,
      isFinished: false,
      refreshing: false,
      list: [],
      pageNum: 1,
      pageSize: 20
    }
  },
  watch: {
    test() {}
  },
  mounted() {},
  methods: {
    async homeTabContent(tabId) {
      const res = await homeTabContent({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tabId
      })
      if (res.result === '0') {
        if (this.refreshing) {
          await sleep(2)
          this.list = []
          this.refreshing = false
        }
        this.list = this.list.concat(res.data.list)
        this.loading = false
        this.pageNum += 1
        if (res.data.list.length < this.pageSize) {
          this.isFinished = true
        }
      }
    },
    onLoad() {
      this.homeTabContent(this.tabId)
    },
    isLink(link) {
      if (link == '') {
        return false
      } else {
        return true
      }
    },
    onRefresh() {
      // 清空列表数据
      this.isFinished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.pageNum = 1
      this.onLoad()
    },
    linkTo(url) {
      if (url) {
        window.location = url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#common_content {
  width: 100%;
  padding: 19px 15px;
  box-sizing: border-box;

  .content_item {
    position: relative;
    width: 100%;
    height: 180px;
    margin-bottom: 15px;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);

    .item_image {
      width: 100%;
      height: 100%;
    }
    .item_see {
      position: absolute;
      right: 0;
      bottom: 15px;
      width: 105px;
      height: 32px;
      padding-right: 10px;
      line-height: 32px;
      text-align: right;
      background-image: url("../../assets/imgs/see.png");
      background-size: 100%;
      box-sizing: border-box;

      .item_see_text {
        font-size: 16px;
        color: #222222;
      }

      .right_arrow {
        @include right-arrow(#222222);
      }
    }
  }
}
</style>
