<template>
  <div class="message_content">
    <div class="message_search">
      <van-search
        v-model="value"
        disabled
        @click="showSearch"
        background="#f3f3f3"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="message_list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="300"
        error-text="请求失败，点击重新加载"
      >
        <div>
          <div
            class="message_list_item"
            v-for="row in list"
            :key="row.id"
            @click="routerTo(row.path)"
          >
            <div class="icon" :style="{ background: row.color }">
              <img :src="row.icon" :class="{ user: row.type == 'xiaoxi' }" />
            </div>
            <div class="title">
              <div class="title_top">
                <h3>{{ row.title }}</h3>
                <span class="time" v-if="row.type == 'xiaoxi'">{{
                  row.createTime
                }}</span>
              </div>
              <div class="title_bottom">
                <p>{{ row.messageContent }}</p>
                <span v-if="row.type == 'xiaoxi'">{{ row.num }}</span>
              </div>
              <div class="status" v-if="row.messageCount > 0"></div>
              <img class="you" v-if="row.type != 'xiaoxi'" :src="you" />
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search } from 'vant'
import hudong from '../../assets/imgs/hudong.png'
import xitong from '../../assets/imgs/xiaoxi.png'
import gonghui from '../../assets/imgs/gonghui.png'
import userIcon from '../../assets/imgs/usericon.png'
import you from '../../assets/imgs/you.png'
import {
  sysList,
  getInfo,
  applyMessage,
  vipmessagesysIndex
} from '../../api/info'
Vue.use(Search)
export default {
  name: 'InterativeNews',
  data() {
    return {
      you: you,
      value: '',
      isActive: 0,
      pageNum: 1,
      pageSize: 10,
      total: 10,
      loading: false,
      finished: false,
      error: false,
      list: [
        // {
        //   title: "公会申请",
        //   p: "团长：2021年1月10日，是首个“中国人...",
        //   color: "#1452F5",
        //   time: "",
        //   icon: gonghui,
        //   type: "gonghui",
        //   path: "/guildMembers",
        // },
        // {
        //   title: "系统消息",
        //   p: "团长：2021年1月10日，是首个“中国人...",
        //   time: "",
        //   color: "#02BB00",
        //   icon: xitong,
        //   type: "xitong",
        //   path: "/systemMessage",
        // },
        // {
        //   title: "互动消息",
        //   p: "团长：2021年1月10日，是首个“中国人...",
        //   time: "",
        //   color: "#FC4B63",
        //   icon: xitong,
        //   type: "hudong",
        //   path: "/interactiveNews",
        // },
        // {
        //   title: "系统消息",
        //   p: "团长：2021年1月10日，是首个“中国人...",
        //   time: "",
        //   color: "transparent",
        //   icon: userIcon,
        //   type: "xiaoxi",
        //   time: "02-10",
        //   num: 999,
        // },
        // {
        //   title: "系统消息",
        //   p: "团长：2021年1月10日，是首个“中国人...",
        //   color: "#1452",
        //   time: "",
        //   color: "transparent",
        //   icon: userIcon,
        //   type: "xiaoxi",
        //   time: "02-10",
        //   num: 999,
        // },
        // {
        //   title: "系统消息",
        //   p: "团长：2021年1月10日，是首个“中国人...",
        //   color: "transparent",
        //   icon: userIcon,
        //   type: "xiaoxi",
        //   time: "02-10",
        //   num: 999,
        // },
      ]
    }
  },
  mounted() {
    this.$store.dispatch('app/setMessageNum', false)
  
    this.vipmessagesysIndexData()
  },
  methods: {
    getGuildData(id) {
      const params = {
        token: this.$store.getters.userInfo.token
      }
      const that = this
      applyMessage(params).then(function(res) {
        if (res.result == 0) {
          const arr = []
          if (parseInt(res.data.msgNum) > 0) {
            arr.push(
              Object.assign(
                {},
                {
                  title: '公会申请',
                  messageContent: res.data.tip,
                  color: '#1452F5',
                  time: '',
                  icon: gonghui,
                  type: 'gonghui',
                  messageCount: res.data.msgNum,
                  path:
                    'guild-members/' + that.$store.getters.userInfo.vipGuildId,
                  num: res.data.msgNum
                }
              )
            )
            that.$store.dispatch('app/setMessageNum', true)
          } else {
            arr.push(
              Object.assign(
                {},
                {
                  title: '公会申请',
                  messageContent: '暂无公会消息！',
                  color: '#1452F5',
                  time: '',
                  icon: gonghui,
                  type: 'gonghui',
                  messageCount: 0,
                  path:
                    'guild-memberr/' + that.$store.getters.userInfo.vipGuildId,
                  num: 0
                }
              )
            )
          }
          that.list.push(...arr) // 将数据放入list中
        }
        // }
      })
    },
    // 获取个人信息
    getInfoData() {
      const that = this
      getInfo().then(function(res) {
        if (res.result == 0) {
          console.log(res)
          that.user = res.data.vipNick
          that.userImg = res.data.vipPic
          that.userId = res.data.id
          if (
            !(
              !res.data.vipGuildId &&
              typeof res.data.vipGuildId !== 'undefined' &&
              res.data.vipGuildId != 0
            )
          ) {
            if (res.data.vipRole == 1 || res.data.vipRole == 2) {
              that.getGuildData()
            }
          }
        }
      })
    },

    // 获取系统消息
    vipmessagesysIndexData() {
      const that = this
      vipmessagesysIndex().then(function(res) {
        if (res.result == 0) {
          console.log(res)
          const arr = []
          if (!res.data && typeof res.data !== 'undefined' && res.data != 0) {
            arr.push(
              Object.assign(
                {},
                {
                  icon: xitong,
                  title: '系统消息',
                  type: 'xitong',
                  path: '/systemMessage',
                  color: '#02BB00',
                  messageCount: 0,
                  messageContent: '暂无最新消息！'
                }
              )
            )
          } else {
            arr.push(
              Object.assign(
                {},
                {
                  icon: xitong,
                  title: '系统消息',
                  type: 'xitong',
                  path: '/systemMessage',
                  color: '#02BB00',
                  messageCount: res.data.messageCount,
                  messageContent: res.data.messageTitle
                }
              )
            )
            that.$store.dispatch('app/setMessageNum', true)
          }
          that.list.push(...arr) // 将数据放入list中
            that.getInfoData();
        }
      })
    },
    onLoad() {
      const timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.pageNum++ // 分页数加一
        this.finished = true
        this.finished && clearTimeout(timer) // 清除计时器
      }, 100)
    },
    // 加载失败调用方法
    onRefresh() {
      this.finished = false // 清空列表数据
      this.loading = true // 将 loading 设置为 true，表示处于加载状态
      this.pageNum = 1 // 分页数赋值为1
      this.list = [] // 清空数组
      this.onLoad() // 重新加载数据
    },

    setActive(index) {
      this.isActive = index
    },
    routerTo(path) {
      console.log(path)
      if (path.indexOf('guild-members') != -1) {
        var id = path.split('/')[1]
        this.$router.push({
          name: 'GuildMember',
          params: {
            id
          },
          query:{
              activeIndex:2
          }
        })
      }else if (path.indexOf('guild-memberr') != -1) {
        var id = path.split('/')[1]
        this.$router.push({
          name: 'GuildMember',
          params: {
            id
          },
          
        })
      }  else {
       this.$router.push({
          path:path
        })
      }
    },
    showSearch() {
      this.$router.push({
        path: '/messageSearch',
        query: {
          value: '',
          active: 0

        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.message_content {
  background: #fff;
  width: 100%;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  .message_list_item {
    display: flex;
    margin: 0px 15px;

    .icon {
      width: 42px;
      height: 42px;
      background: #02bb00;
      border-radius: 50%;
      margin-right: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 12px;
      img {
        width: 30px;
        height: 30px;
        &.user {
          width: 42px;
          height: 42px;
        }
      }
    }
    .title {
      flex: 1;
      border-bottom: 1px solid #f8f8f8;
      padding: 12px 0px;
      position: relative;
      margin-bottom: 2px;
      .you {
        width: 7px;
        height: 13px;
        display: block;
        position: absolute;
        right: 0px;
        top: 26px;
      }
      .status {
        width: 8px;
        height: 8px;
        display: block;
        position: absolute;
        right: 8px;
        top: 28px;
        background: #ff0000;
        border-radius: 50%;
      }
      .title_top {
        display: flex;
        justify-content: space-between;
        h3 {
          width: 200px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 20px;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          width: 37px;
          height: 20px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 20px;
          display: block;
        }
      }
      .title_bottom {
        display: flex;
        justify-content: space-between;
        p {
          width: 260px;
          height: 19px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 19px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0px;
          margin: 0px;
          text-align: left;
        }
        span {
          width: 30px;
          height: 16px;
          background: #fc4b63;
          border-radius: 8px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 16px;
          text-align: center;
          display: block;
          vertical-align: top;
          margin-top: 1px;
        }
      }
    }
  }
}
.van-search__content {
  background-color: #ffffff !important;
}
</style>
