<template>
  <div class="system_content">
    <div class="system_data">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        offset="10"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div
          class="system_item"
          v-for="(row, index) in message_list"
          :key="index"
        >
          <div class="item_top">
            <img :src="system" />
            <p>{{ row.messageTitle }}</p>
          </div>
          <p class="content">{{ row.messageContent }}</p>
          <div class="ctl_content">
            <div class="createTime">
              {{ row.createTime }}
            </div>
            <div  v-if="row.isMessage" class="ctl" @click="showUrl(row)">查看详情</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import system from '../../../assets/imgs/system.png'
import { sysList } from '../../../api/info'
export default {
  name: 'SystemMessage',
  data() {
    return {
      system,
      // 上拉加载
      loading: false,
      finished: false,
      dayAdd: 10,
      mouthAdd: 30,
      countAdd: 100,
      pageSize: 10,
      pageNum: 1,
      total: 10,

      message_list: []
    }
  },
  methods: {
    showUrl(row) {
      window.location.href = row.messageUrl
    },
    // 上拉加载数据
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.getsysList() // 调用上面方法,请求数据
        this.pageNum++ // 分页数加一
        this.getsysList && clearTimeout(timer) // 清除计时器
      }, 100)
    },

    getsysList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      const that = this
      sysList(params).then(function(res) {
        if (res.result == 0) {
          if (res.data.list.length === 0) {
            // 判断获取数据条数若等于0
            // that.message_list = []; // 清空数组
            that.finished = true // 停止加载
          }
          // 若数据条数不等于0
          that.total = res.data.total // 给数据条数赋值
          const arr = []
          for (let i = 0; i < res.data.list.length; i++) {
            arr.push(
              Object.assign(res.data.list[i], {
                isMessage: !(
                  !res.data.list[i].messageUrl &&
                  typeof res.data.list[i].messageUrl !== 'undefined' &&
                  res.data.list[i].messageUrl != 0
                )
              })
            )
          }
          that.message_list.push(...arr) // 将数据放入list中
          that.loading = false // 加载状态结束
          // 如果list长度大于等于总数据条数,数据全部加载完成
          if (that.message_list.length >= res.data.total) {
            that.finished = true // 结束加载状态
          }
        }
      })
    },

    routerTo(path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.system_content {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  overflow: scroll;
  .system_data {
    margin: 0px 15px;
    .system_item {
      width: 100%;
      height: 155px;
      background: #ffffff;
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      margin-top: 15px;
      box-sizing: border-box;
      padding: 17px 15px;
      .item_top {
        display: flex;
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
          vertical-align: top;
          margin-top: 2px;
        }
        p {
          width: 250px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 20px;
          vertical-align: top;
          margin: 0px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
      }
      p {
        height: 56px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 19px;
        text-align: left;
        margin: 12px 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /*行数*/
        &.content{
          text-indent: 2em;
        }
      }
      .ctl_content {
        display: flex;
        justify-content: space-between;
        .createTime {
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 21px;
        }
        .ctl {
          width: 75px;
          height: 21px;
          border-radius: 11px;
          border: 1px solid #1452f5;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1452f5;
          line-height: 21px;
          text-align: center;
          display: block;
          &:active {
            color: #ffffff;
            background-color: #1452f5;
          }
        }
      }
    }
  }
}
</style>
