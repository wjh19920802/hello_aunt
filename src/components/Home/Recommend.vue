<template>
  <div id="recommend_wrap">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="isLoading"
        :finished="isFinished"
        :offset="100"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          class="recommend-item"
          v-for="(item, index) in recommendData"
          :key="item.index"
          @click="routeTo(item.worksType, item.id)"
        >
          <ArticleCard
            class="card-item"
            v-if="item.worksType == 1"
            :cardData="item"
          />
          <VideoCard
            class="card-item"
            v-if="item.worksType == 2"
            :cardData="item"
            v-on="$listeners"
          />
          <ShuoshuoCard
            class="card-item"
            v-if="item.worksType == 0"
            :cardData="item"
          />
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { sleep } from '@/utils'
import ArticleCard from './Card/ArticleCard'
import VideoCard from './Card/VideoCard'
import ShuoshuoCard from './Card/ShuoshuoCard'
import { worksList } from 'api/home'
export default {
  name: 'Recommend',
  components: {
    ArticleCard,
    VideoCard,
    ShuoshuoCard
  },
  props: {
    activeIndex: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      // 是否在加载中
      isLoading: false,
      // 是否处于下拉刷新加载中
      refreshing: false,
      recommendData: [],
      isFinished: false,
      pageSize: 20,
      pageNum: 1,
      nextDate: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
    // 触发下拉刷新
    onRefresh() {
      console.log('下啦')
      this.pageNum = 1
      this.nextDate = ''
      this.isFinished = false
      this.isLoading = true
      this.onLoad()
    },
    onLoad() {
      this.worksList()
    },
    routeTo(type, id) {
      switch (type) {
        case 1:
          this.$router.push({
            name: 'Article',
            params: { id: id }
          })
          return
        case 0:
          this.$router.push({
            name: 'Shuoshuo',
            params: { id: id }
          })
          return
      }
    },
    async worksList() {
      this.isLoading = true
      const res = await worksList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        nextDate: this.nextDate
      })
      if (res.result === '0') {
        if (this.refreshing) {
          await sleep(2)
          this.recommendData = []
          this.refreshing = false
        }
        this.recommendData = this.recommendData.concat(res.data.list)
        this.pageNum += 1
        this.nextDate = res.data.nextDate
        this.isLoading = false
        if (res.data.list.length < this.pageSize) {
          this.isFinished = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#recommend_wrap {
  width: 100%;
  height: auto;
  padding: 15px 15px 11px;
  box-sizing: border-box;
}
.recommend-item {
  width: 100%;
  padding: 0;
  margin-bottom: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.05);
  /*background-color: transparent !important;*/
}

/deep/.van-cell::after {
  display: none !important;
}
</style>
