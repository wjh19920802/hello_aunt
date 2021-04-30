<template>
  <div class="home_content">
    <div class="personal_bg"></div>
    <div class="personal_data">
      <div class="personal_header">
        <div class="header_img">
          <img :src="logo" />
        </div>
        <div class="title">
          <div>
            <p>{{ userName }}</p>
            <img :src="sex_img" class="sex" />
          </div>
          <div class="userid_content">
            <span class="userid">ID：{{ userId }}</span>
          </div>
          <div class="title_address">
            <div>
              <img :src="address" class="address" />
              <p>{{ userAddress }}{{ vipCity }}</p>
            </div>
            <div class="button_content" v-if="isShowedit">
              <button @click="routerEditingMaterials">编辑资料</button>
            </div>
          </div>
        </div>
      </div>
      <div class="info_data">
        <p :class="{ all_title: isAll }">{{ userIntroduce }}</p>
        <p
          class="all"
          v-if="!isAll & (userIntroduce.length > 30)"
          @click="showAll()"
        >
          全部
        </p>
      </div>
      <div class="personal_gonghui" v-if="isguild" @click="routerGuild">
        <p>
          所属公会 <span>{{ guildName }}</span>
        </p>
        <img :src="qianyi" />
      </div>
      <div class="personal_ctl">
        <div
          :class="{ personal_ctl_item: true, active: activeIndex == 1 }"
          @click="setActive(1)"
        >
          <p>全部</p>
          <span></span>
        </div>
        <div
          :class="{ personal_ctl_item: true, active: activeIndex == 2 }"
          @click="setActive(2)"
        >
          <p>文章</p>
          <span></span>
        </div>
        <div
          :class="{ personal_ctl_item: true, active: activeIndex == 3 }"
          @click="setActive(3)"
        >
          <p>视频</p>
          <span></span>
        </div>
        <div
          :class="{ personal_ctl_item: true, active: activeIndex == 4 }"
          @click="setActive(4)"
        >
          <p>说说</p>
          <span></span>
        </div>
      </div>
      <div class="personal_list">
        <div class="personal_item">
          <van-list
            v-model="isallUpLoading"
            :finished="upallFinished"
            :immediate-check="false"
            :offset="10"
            :finished-text="finishedText"
            @load="onallLoadList"
            error-text="请求失败，点击重新加载"
          >
            <div v-for="(item, index) in alllist" :key="item.id">
              <div v-if="item.worksType == 1">
                <user-article
                  :key="item.id"
                  :cardData="item"
                  :isShowedit="isShowedit"
                  @deleteItem="deleteItem"
                ></user-article>
              </div>
              <div v-else-if="item.worksType == 2">
                <user-video
                  :key="item.id"
                  :cardData="item"
                  :isShowedit="isShowedit"
                  @deleteItem="deleteItem"
                ></user-video>
              </div>
              <div v-else-if="item.worksType == 0">
                <user-shuoshuo
                  :key="item.id"
                  :cardData="item"
                  :isShowedit="isShowedit"
                  @deleteItem="deleteItem"
                ></user-shuoshuo>
              </div>
            </div>
          </van-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getVipInfo,
  getGuildInfo,
  workslist,
  worksdelete,
  vipInfoorkList
} from '@/api/info'
import { getDateDiff } from '../../../utils/timeuitl'
import user from '../../../assets/imgs/user.png'
import logo from '../../../assets/imgs/logo_nihao.png'
import address from '../../../assets/imgs/address.png'
import sex_nan from '../../../assets/imgs/sex_nan.png'
import sex_nv from '../../../assets/imgs/sex_nv.png'
import qianyi from '../../../assets/imgs/qianyi.png'

import UserShuoshuo from '../../../components/User/shuoshuo.vue'
import UserArticle from '../../../components/User/article.vue'
import UserVideo from '../../../components/User/video.vue'
export default {
  name: 'UserCenter',

  data() {
    return {
      isAll: false,
      // 用户信息
      userId: '',
      userName: '',
      logo: logo,
      userAddress: '',
      vipCity: '',
      userIntroduce: '您还没有填写个人简介哦',
      address,
      sex_img: sex_nan,
      isguild: false,
      guildName: '',
      vipGuildId: '',
      qianyi,
      activeIndex: 1,
      alllist: [
        // type: 1 文章 2 视频 3 说说 4 转发
      ],
      articlelist: [],
      videolist: [],
      shuoshuolist: [],
      isallUpLoading: false, // 全部上拉加载
      upallFinished: false, // 全部上拉加载完毕
      // 全部
      allpageNum: 1,
      allpageSize: 10,
      alltotal: 10,
      type: null,
      isShowedit: false,
      finishedText: '没有更多内容了'
    }
  },
  components: {
    UserShuoshuo,
    UserArticle,
    UserVideo
  },

  mounted() {
    if(this.$route.query.userId == this.$store.state.app.userInfo.id){
       this.userIntroduce= '您还没有填写个人简介哦';
    }else{
       this.userIntroduce= 'Ta还没有填写个人简介哦';
    }
    this.getVipInfoData()
    this.onallLoadList()
    this.isShowedit =
      this.$route.query.userId == this.$store.state.app.userInfo.id
  },
  methods: {
    showAll() {
      this.isAll = true
    },
    getTime: function(time) {
      return getDateDiff(time)
    },
    routerGuild() {
      if (this.isShowedit) {
        this.$router.push({
          path: '/self-guild'
        })
      } else {
        if (this.isguild) {
          this.$router.push({
            path: '/guild-item',
            query: {
              guild_id: this.vipGuildId
            }
          })
        }
      }
    },
    worksdelete(id) {
      const params = {
        workId: id
      }
      const that = this
      worksdelete(params).then(function(res) {
        if (res.result == 0) {
        }
      })
    },
    getvipInfoorkList() {
      const params = {
        vipId: this.$route.query.userId,
        pageSize: this.allpageSize,
        pageNum: this.allpageNum,
        type: this.type
      }

      const that = this
      vipInfoorkList(params).then(function(res) {
        if (res.result == 0) {
          if (res.data.list.length === 0) {
            // 判断获取数据条数若等于0
            that.alllist = [] // 清空数组
            that.upallFinished = true // 停止加载
          }
          // 若数据条数不等于0
          that.alltotal = res.data.total // 给数据条数赋值
          that.alllist.push(...res.data.list) // 将数据放入list中
          console.log(that.alllist)
          that.isallUpLoading = false // 加载状态结束
          // 如果list长度大于等于总数据条数,数据全部加载完成
          if (that.alllist.length >= res.data.total) {
            that.upallFinished = true // 结束加载状态
          }
        }
      })
    },
    // 获取说说列表
    getworkslist() {
      const params = {
        vipId: this.$route.query.userId,
        pageSize: this.allpageSize,
        pageNum: this.allpageNum,
        type: this.type
      }
      if (this.$route.query.userId == this.$store.state.app.userInfo.id) {
        const that = this
        workslist(params).then(function(res) {
          if (res.result == 0) {
            if (res.data.list.length === 0) {
              // 判断获取数据条数若等于0
              that.alllist = [] // 清空数组
              that.upallFinished = true // 停止加载
            }
            // 若数据条数不等于0
            that.alltotal = res.data.total // 给数据条数赋值
            that.alllist.push(...res.data.list) // 将数据放入list中
            console.log(that.alllist)
            that.isallUpLoading = false // 加载状态结束
            // 如果list长度大于等于总数据条数,数据全部加载完成

            if (that.alltotal == 0) {
              that.finishedText = 'TA还没有发布内容哦～'
            } else {
              that.finishedText = '没有更多内容了'
            }
            if (that.alllist.length >= res.data.total) {
              that.upallFinished = true // 结束加载状态
            }
          }
        })
      } else {
        this.getvipInfoorkList()
      }
    },
    getGuildInfoData() {
      const params = {
        guildId: this.vipGuildId,
        token: this.$store.getters.userInfo.token
      }
      const that = this
      getGuildInfo(params).then(function(res) {
        if (res.result == 0) {
          that.guildName = res.data.guildName
        }
      })
    },
    getVipInfoData() {
      const params = {
        vipId: this.$route.query.userId,
        token: this.$store.getters.userInfo.token
      }
      const that = this
      getVipInfo(params).then(function(res) {
        if (res.result == 0) {
          that.userName = res.data.vipNick
          that.userId = res.data.vipNo
          that.logo = res.data.vipPic
          if (
            !(
              !res.data.vipIntroduce &&
              typeof res.data.vipIntroduce !== 'undefined' &&
              res.data.vipIntroduce != 0
            )
          ) {
            that.userIntroduce = res.data.vipIntroduce
          }
          that.userAddress = res.data.vipProvince
          that.vipCity = res.data.vipCity
          that.sex_img = res.data.vipSex == 1 ? sex_nan : sex_nv

          if (
            !res.data.vipGuildId &&
            typeof res.data.vipGuildId !== 'undefined' &&
            res.data.vipGuildId != 0
          ) {
            that.isguild = false
          } else {
            that.isguild = true
            console.log('获取个人公会id', res.data.vipGuildId)
            that.vipGuildId = res.data.vipGuildId
            that.getGuildInfoData()
          }
        }
      })
    },
    routerGO() {
      this.$router.go(-1)
    },
    routerEditingMaterials() {
      this.$router.push({
        path: '/editingMaterials',
        params: {
          userId: this.userId
        }
      })
    },
    deleteItem(index) {
      console.log('删除文章中的一项', index)
      let activeIndex = ''
      this.worksdelete(index)
      for (let i = 0; i < this.alllist.length; i++) {
        if (this.alllist[i].id == index) {
          console.log(this.alllist[i], this.alllist[i].id)
          activeIndex = i
        }
      }
      const arr = this.alllist.concat()
      console.log(arr, activeIndex)
      if (activeIndex == 0) {
        arr.shift()
      } else {
        arr.splice(activeIndex, 1)
      }
      console.log(arr)
      this.$set(this, 'alllist', arr)
    },
    setActive(index) {
      this.activeIndex = index
      this.allpageNum = 1
      this.allpageSize = 10
      this.alltotal = 10
      if (index == 1) {
        this.type = null
      } else if (index == 2) {
        this.type = 1
      } else if (index == 3) {
        this.type = 2
      } else if (index == 4) {
        this.type = 0
      }
      this.alllist = []
      this.onallLoadList()
    },
    // 全部上拉加载请求方法
    onallLoadList() {
      const timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.getworkslist() // 调用上面方法,请求数据
        this.allpageNum++ // 分页数加一
        this.upallFinished && clearTimeout(timer) // 清除计时器
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.home_content {
  position: relative;
  border-top: 1px solid #ffffff;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0px;
  .personal_bg {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 260px;
    background: linear-gradient(90deg, #ed17aa 0%, #1452f5 100%);
  }
  .personal_data {
    position: relative;
    z-index: 100;
  }
  .personal_header {
    display: flex;
    box-sizing: border-box;
    padding: 0px 15px;
    margin-top: 15px;
    .header_img {
      width: 72px;
      height: 72px;
      margin-right: 15px;
      img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
      }
    }
    .title {
      flex: 1;
      div {
        display: flex;
        margin-top: 0px;
        &.userid_content {
          margin-top: 4px;
          margin-bottom: 4px;
        }
        p {
          max-width: 200px;
          height: 25px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 25px;
          margin-right: 11px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 18px;
          height: 18px;
          margin-top: 3px;
        }
        .userid {
          max-width: 196px;
          padding: 0px 9px;
          width: auto;
          height: 20px;
          background: rgba(34, 34, 34, 0.32);
          border-radius: 11px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 20px;
          text-align: center;
        }
        span {
          width: 104px;
          height: 25px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #c5c4c4;
          line-height: 25px;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .title_address {
        display: flex;
        justify-content: space-around;
        margin-top: 0px;
        div {
          margin-top: 0px;
          flex: 1;
          .sex {
            width: 18px;
            height: 18px;
            background: #ffffff;
            opacity: 0.57;
            margin-top: 2px;
            vertical-align: top;
            border-radius: 50%;
          }
          .address {
            margin-top: 5px;
            vertical-align: top;
            width: 12px;
            height: 12px;
            display: block;
            margin-left: 0px;
            margin-right: 3px;
          }
          p {
            width: 158px;
            height: 21px;
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 21px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
          }
        }
        .button_content {
          display: flex;
          justify-content: center;
          width: 50px;
          button {
            width: 90px;
            height: 21px;
            background: #ffffff;
            border-radius: 5px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #1452f5;
            line-height: 21px;
            text-align: center;
            border: 0px;
            &:active {
              background: #d4d4d4;
              color: #1452f5;
            }
          }
        }
      }
    }
  }
  .info_data {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0px 15px;
    margin: 15px auto;
    p {
      width: 302px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 17px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
      &.all_title {
        width: 100%;
        overflow: auto;
        white-space: pre-wrap;
        text-overflow: clip;
      }
    }
    .all {
      width: 35px;
      height: 15px;
      border-radius: 8px;
      border: 1px solid #ffffff;

      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 15px;
      text-align: center;
    }
  }
  .personal_gonghui {
    width: 345px;
    height: 41px;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 0px 0px rgba(255, 255, 255, 1);
    border-radius: 12px 12px 0px 0px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0px 19px;
    padding-top: 11px;
    margin: 0px auto;
    p {
      width: 300px;
      height: 19px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 19px;
      text-align: left;
      span {
        width: 130px;
        height: 19px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 19px;
        text-align: left;
      }
    }
    img {
      width: 7px;
      height: 13px;
      vertical-align: top;
      margin-top: 3px;
    }
  }
  .personal_ctl {
    width: 100%;
    height: 48px;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0px rgba(229, 229, 229, 1);
    border-radius: 12px 12px 0px 0px;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #f8f8f8;
    .personal_ctl_item {
      flex: 1;
      p {
        width: 100%;
        height: 20px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #353535;
        line-height: 20px;
        text-align: center;
        margin-top: 14px;
      }
      span {
        width: 30px;
        height: 2px;
        background: #ffffff;
        border-radius: 50px;
        display: block;
        margin: 0px auto;
        margin-top: 12px;
      }
      &.active {
        p {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 700;
          color: #1452f5;
          line-height: 20px;
        }
        span {
          background: #1452f5;
        }
      }
    }
  }
  .personal_list {
    width: 100%;
    min-height: 500px;
    background: #ffffff;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.05);
  }
}
</style>
