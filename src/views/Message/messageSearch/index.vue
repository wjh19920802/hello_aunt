<template>
  <!-- 搜索页面 -->
  <div class="search_content">
    <div class="search_data">
      <div class="search_input">
        <div>
          <img :src="searchIcon" />
          <input
              v-model="value"
              placeholder="请输入搜索内容"
              type="search"
              @keydown.enter="routerSearch"
          />
        </div>
        <p @click="hideSearch">取消</p>
        <!-- <van-search
          background="#f3f3f3"
          v-model="value"
          placeholder="请输入搜索关键词"
          input-align="left"
          show-action
          @search="onSearch"
          @cancel="hideSearch"
        /> -->
      </div>
    </div>

    <div class="search_datalist" v-if="!isSearchData">
      <div class="search_list">
        <div class="search_list_data">
          <div
              class="srarch_list_item"
              v-for="(row, index) in searchListData"
              :key="index"
          >
            <div>
              <img class="time" :src="shijian" />
              <p @click="sethideSearch(row)">{{ row }}</p>
            </div>
            <img @click="clearSearchList(index)" :src="close" />
          </div>
        </div>
      </div>
      <div class="clear_search">
        <p @click="clearSearch()" v-if="searchListData.length > 0">
          清空搜索记录
        </p>
      </div>
    </div>
    <div class="message_datalist" v-if="isSearchData">
      <div class="message_ctl">
        <div
            :class="{ message_ctl_item: true, active: isActive == 0 }"
            @click="setActive(0)"
        >
          <p>用户</p>
          <span></span>
        </div>
        <div
            :class="{ message_ctl_item: true, active: isActive == 1 }"
            @click="setActive(1)"
        >
          <p>公会</p>
          <span></span>
        </div>
      </div>
      <div class="message_data">
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            :offset="100"
            finished-text="没有更多搜索内容"
            @load="onallLoadList"
            error-text="请求失败，点击重新加载"
        >
          <div v-for="(item, index) in searchList" :key="item.id">
            <div class="user_content" v-if="item.type == 'user'">
              <div class="user_left" @click="routerpersonalHomepage(item.id)">
                <img :src="item.vipPic" />
                <p>{{ item.vipNick }}</p>
              </div>
              <div class="user_right">
                <!-- <div class="user_ctl">私信</div> -->
              </div>
            </div>

            <div class="guild_content" v-else>
              <div class="guild_left" @click="routerGuild(item.id)">
                <img :src="item.guildPic" />
                <div class="guild_title">
                  <p>{{ item.guildName }}</p>
                  <img :src="item.guildImg" />
                </div>
              </div>
              <div class="guild_right">
                <div class="guild_ctl" @click="routerGuild(item.id)">加入</div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search } from 'vant'
Vue.use(Search)
import user from '../../../assets/imgs/user.png'
import gonghui from '../../../assets/imgs/logo_gonghui.png'

import shijian from '../../../assets/imgs/shijian.png'
import close from '../../../assets/imgs/close.png'

import { queryGuildList, queryUserList } from '../../../api/info'

import grade1 from '../../../assets/imgs/grade1.png'
import grade2 from '../../../assets/imgs/grade2.png'
import grade3 from '../../../assets/imgs/grade3.png'
import grade4 from '../../../assets/imgs/grade4.png'
import grade5 from '../../../assets/imgs/grade5.png'
import grade6 from '../../../assets/imgs/grade6.png'
import grade7 from '../../../assets/imgs/grade7.png'
import searchIcon from '../../../assets/imgs/searchIcon.png'
export default {
  name: 'MessageSearch',
  data() {
    return {
      shijian,
      close,
      grade1,
      grade2,
      grade3,
      grade4,
      grade5,
      grade6,
      grade7,
      user,
      gonghui,
      searchIcon,
      pageSize: 10,
      pageNum: 1,
      value: '',
      total: 10,
      isActive: 0,
      searchList: [],
      loading: false,
      finished: false,
      isContribution: false,
      isScreen: false,
      searchListData: [],
      isSearchData: false
    }
  },
  mounted() {
    // this.onallLoadList();
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query.value == '') {
        this.isSearchData = false
        this.getSearchList()
      } else {
        this.value = this.$route.query.value
        this.isActive = this.$route.query.active
        this.onSearch()
      }
    },
    routerGuild(id) {
      this.$router.push({
        path: '/guild-item',
        query: {
          guild_id: id
        }
      })
    },
    clearSearch() {
      this.searchListData = []
      localStorage.removeItem('search_list_data')
    },
    getSearchList() {
      const data = localStorage.getItem('search_list_data')
      if (!data && typeof data !== 'undefined' && data != 0) {
        this.searchListData = []
      } else {
        if (data != '') {
          this.searchListData = data.split(',').reverse()
        }
      }
    },
    clearSearchList(index) {
      const arr = this.searchListData.concat([])
      console.log(arr, index)
      arr.splice(index, 1)

      console.log(arr)
      this.searchListData = arr
      console.log(this.searchListData)
      const str = arr.join(',')
      console.log(str)
      localStorage.setItem('search_list_data', str)
    },
    onSearchData() {
      let data = localStorage.getItem('search_list_data')
      if (this.value != '') {
        if (!data && typeof data !== 'undefined' && data != 0) {
          const str = this.value
          localStorage.setItem('search_list_data', str)
        } else {
          const arr = data.split(',')
          if (arr.length <= 10) {
            if (arr.indexOf(this.value) == -1) {
              if (data == '') {
                data += this.value
              } else {
                data += ',' + this.value
              }
              localStorage.setItem('search_list_data', data)
            }
          } else {
          }
        }
      } else {
        this.value = ''
      }
    },
    setActive(index) {
      this.isActive = index
      this.pageNum = 1
      this.total = 10
      this.searchList = []
      this.onallLoadList()
    },
    routerpersonalHomepage(id) {
      this.$router.push({
        path: '/personalHomepage',
        query: {
          userId: id
        }
      })
    },
    routerGO() {
      this.$router.go(-1)
    },
    queryUserListData() {
      const params = {
        token: this.$store.getters.userInfo.token,
        vipName: this.value,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      const that = this
      queryUserList(params).then(function(res) {
        if (res.result == 0) {
          if (res.data.list.length === 0) {
            // 判断获取数据条数若等于0
            that.searchList = [] // 清空数组
            that.finished = true // 停止加载
          }
          // 若数据条数不等于0
          that.total = parseInt(res.data.total) // 给数据条数赋值
          const arr = []
          for (let i = 0; i < res.data.list.length; i++) {
            arr.push(Object.assign(res.data.list[i], { type: 'user' }))
          }
          that.searchList.push(...arr) // 将数据放入list中

          that.loading = false // 加载状态结束
          // 如果list长度大于等于总数据条数,数据全部加载完成
          if (that.searchList.length >= res.data.total) {
            that.finished = true // 结束加载状态
          }
        }
      })
    },
    queryGuildListData() {
      const params = {
        token: this.$store.getters.userInfo.token,
        guildIdOrName: this.value,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      const that = this
      queryGuildList(params).then(function(res) {
        if (res.result == 0) {
          if (res.data.list.length === 0) {
            // 判断获取数据条数若等于0
            that.searchList = [] // 清空数组
            that.finished = true // 停止加载
          }
          // 若数据条数不等于0
          that.total = parseInt(res.data.total) // 给数据条数赋值
          const arr = []
          for (let i = 0; i < res.data.list.length; i++) {
            arr.push(
              Object.assign(res.data.list[i], {
                type: 'guild',
                guildImg: that['grade' + res.data.list[i].guildLv]
              })
            )
          }
          that.searchList.push(...arr) // 将数据放入list中

          that.loading = false // 加载状态结束
          // 如果list长度大于等于总数据条数,数据全部加载完成
          if (that.searchList.length >= res.data.total) {
            that.finished = true // 结束加载状态
          }
        }
      })
    },
    getSearchListCtl() {
      if (this.isActive == 0) {
        this.queryUserListData()
      } else {
        this.queryGuildListData()
      }
    },

    onSearch() {
      this.pageNum = 1
      this.total = 10
      this.searchList = []
      this.onSearchData()
      this.getSearchListCtl()
      this.isSearchData = true
    },
    routerSearch() {
      console.log('搜索内容', this.value)
      this.onSearchData()
      this.$router.replace({
        path: '/messageSearch',
        query: {
          value: this.value,
          active: this.isActive
        }
      })
      this.onSearch()
    },
    sethideSearch(value) {
      this.value = value
      this.isSearchData = true
      this.$router.replace({
        path: '/messageSearch',
        query: {
          value: this.value,
          active: this.isActive
        }
      })
      this.onSearch()
    },
    // 全部上拉加载请求方法
    onallLoadList() {
      const timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.getSearchListCtl() // 调用上面方法,请求数据
        this.pageNum++ // 分页数加一
        this.loading = true
        this.finished && clearTimeout(timer) // 清除计时器
      }, 100)
    },
    hideSearch() {
      console.log(this.isSearch)
      this.isSearch = false
      console.log(this.isSearch)
      this.$router.push({
        path: '/Message',
        query: {
          value: ''
        }
      })
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
  background: #ffffff;
  z-index: 100000;
  overflow: scroll;

  .message_data {
    overflow: scroll;
  }
  .search_data {
    width: 100%;
    margin: 0px auto;
    .search_input {
      display: flex;
      width: 100%;
      background-color: #f3f3f3;
      padding: 8px 0px;
      div {
        width: 317px;
        height: 28px;
        background: #ffffff;
        border-radius: 5px;
        border: 1px solid #e6e6ea;
        display: flex;
        margin-left: 8px;

        img {
          width: 30px;
          height: 30px;

          margin-top: 0px;
          margin: 0px 8px;
        }
        input {
          flex: 1;
          height: 23px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 23px;
          margin-top: 2px;
          border: 0px;
          &:focus {
            outline: none;
          }
        }
      }
      p {
        flex: 1;
        height: 28px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        text-align: center;
      }
    }
  }

  .message_ctl {
    width: 375px;
    height: 47px;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(229, 229, 229, 1);
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    margin: 0px auto;
    .message_ctl_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        width: 50px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;

        color: #353535;
        line-height: 20px;
        margin-bottom: 11px;
        margin-top: 13px;
      }
      span {
        width: 30px;
        height: 2px;
        background: #ffffff;
        border-radius: 50px;
        display: block;
      }

      &.active {
        p {
          color: #1452f5;
        }
        span {
          background: #1452f5;
        }
      }
    }
  }
  .user_content {
    display: flex;
    justify-content: space-between;
    padding: 0px 15px;
    margin-top: 15px;
    .user_left {
      display: flex;
      flex: 1;
      img {
        width: 42px;
        height: 42px;
        margin-right: 13px;
        border-radius: 50%;
        object-fit: cover;
      }
      p {
        flex: 1;
        height: 42px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 42px;
        text-align: left;
      }
    }
    .user_right {
      width: 65px;
      .user_ctl {
        width: 59px;
        height: 21px;
        border-radius: 11px;
        border: 1px solid #1452f5;
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1452f5;
        line-height: 21px;
        margin-top: 11px;
        &:active {
          background: #1452f5;
          color: #ffffff;
        }
      }
    }
  }

  .guild_content {
    display: flex;
    justify-content: space-between;
    padding: 0px 15px;
    margin-top: 15px;
    .guild_left {
      display: flex;
      flex: 1;
      img {
        width: 44px;
        height: 44px;
        margin-right: 13px;
        border-radius: 50%;
        object-fit: cover;
      }
      .guild_title {
        text-align: left;
        p {
          width: 150px;
          height: 21px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 21px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 72px;
          height: 23px;
          border-radius: 0px;
        }
      }
    }
    .guild_right {
      width: 65px;
      .guild_ctl {
        width: 59px;
        height: 21px;
        border-radius: 11px;
        border: 1px solid #1452f5;
        text-align: center;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1452f5;
        line-height: 21px;
        margin-top: 13px;
        &:active {
          background: #1452f5;
          color: #ffffff;
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

.search_list {
  width: 100%;
  margin-top: 0px;
  background: #ffffff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 78px;
  .srarch_list_item {
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 10px 0px;
    margin: 0px 15px;
    border-bottom: 1px solid #f3f3f3;
    div {
      display: flex;
    }
    p {
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
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
</style>
