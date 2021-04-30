<template>
  <!-- 搜索页面 -->
  <div class="search_content">
    <div class="search_data">
      <div class="search_input">
        <van-search
          background="#f3f3f3"
          v-model="value"
          placeholder="请输入搜索关键词"
          input-align="center"
          show-action
          @search="onSearch"
          @cancel="hideSearch"
        />
      </div>
      <div class="search_list">
        <div
          class="srarch_list_item"
          v-for="(row, index) in searchList"
          :key="index"
        >
          <div>
            <img class="time" :src="shijian" />
            <p @click="sethideSearch(row)">{{ row }}</p>
          </div>
          <img @click="clearSearchList(index)" :src="close" />
        </div>
      </div>
      <div class="clear_search">
        <p @click="clearSearch()">清空搜索记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search } from 'vant'
Vue.use(Search)
import shijian from '../../../assets/imgs/shijian.png'
import close from '../../../assets/imgs/close.png'
export default {
  name: 'MessageSearch',
  data() {
    return {
      shijian,
      close,
      value: '',
      // 判断点击状态
      isTime: false,
      isContribution: false,
      isScreen: false,

      searchList: []
    }
  },
  mounted() {
    if (this.$route.query.value != '') {
      this.value = this.$route.query.value
    }
    this.getSearchList()
  },
  methods: {
    routerGO() {
      this.$router.go(-1)
    },
    clearSearch() {
      this.searchList = []
      localStorage.removeItem('search_list')
    },
    getSearchList() {
      const data = localStorage.getItem('search_list')
      console.log(data)
      if (!data && typeof data !== 'undefined' && data != 0) {
        this.searchList = []
      } else {
        this.searchList = data.split(',')
      }
    },
    clearSearchList(index) {
      const arr = this.searchList.concat([])
      console.log(arr, index)
      arr.splice(index, 1)

      console.log(arr)
      this.searchList = arr
      console.log(this.searchList)
      const str = arr.join(',')
      console.log(str)
      localStorage.setItem('search_list', str)
    },
    onSearch() {
      let data = localStorage.getItem('search_list')
      console.log(data)
      if (this.value != '') {
        if (!data && typeof data !== 'undefined' && data != 0) {
          const str = this.value
          localStorage.setItem('search_list', str)
        } else {
          const arr = data.split(',')
          if (arr.length <= 10) {
            if (arr.indexOf(this.value) == -1) {
              if (data == '') {
                data += this.value
              } else {
                data += ',' + this.value
              }
              localStorage.setItem('search_list', data)
            }
          } else {
          }
        }
      } else {
        this.value = ''
      }
      this.hideSearch(this.value)
    },
    sethideSearch(value) {
      this.value = value
      this.hideSearch()
    },
    hideSearch() {
      console.log(this.isSearch)
      this.isSearch = false
      console.log(this.isSearch)
      this.$router.push({
        path: '/Message',
        query: {
          value: this.value
        }
      })
    },

    showSearch() {
      this.isSearch = true
      this.getSearchList()
    }
  }
}
</script>

<style lang="scss" scoped>
.search_content {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #f3f3f3;
  z-index: 100000;
  .search_data {
    width: 100%;
    margin: 0px auto;
    .search_input {
      width: 100%;
    }
    .search_list {
      width: 100%;
      margin-top: 15px;
      background: #ffffff;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
      margin-bottom: 78px;
      .srarch_list_item {
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        box-sizing: border-box;
        padding: 5px 0px;
        margin: 0px 15px;
        border-bottom: 1px solid #f3f3f3;
        div {
          display: flex;
        }
        p {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 22px;
          width: 200px;
          height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: top;
          text-align: left;
          &:active {
            color: #1452f5;
          }
        }
        img {
          width: 14px;
          height: 14px;
          margin-top: 4px;
          &.time {
            width: 13px;
            height: 13px;
            vertical-align: top;
            margin-top: 4px;
            margin-left: 15px;
            margin-right: 7px;
          }
        }
      }
    }

    .clear_search {
      margin-top: 15px;
      p {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1452f5;
        line-height: 20px;
        text-align: center;
        &:active {
          color: #000000;
        }
      }
    }
  }
}
</style>
