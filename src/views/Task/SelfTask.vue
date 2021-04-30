<template>
  <div id="guild_wrap" class="ig_tab_content_wrap">
    <div class="guild_top_bg"></div>
    <RewardCard :user-info="userInfo" />
    <SignInCard
        v-if="isOpen"
        :sign-in-data="signInData"
        :sign-times="signTimes"
        :is-sign="isSign"
        @signIn="signIn"
    />
    <TaskCard v-if="goldTask.length > 0" :task-data="goldTask" title="金币任务" taskIcon="coin" />
    <TaskCard v-if="dayTask.length > 0" :task-data="dayTask" title="日常任务" taskIcon="contribution" />
    <!--<div class="guild_join" v-if="scene">加入公会</div>-->
  </div>
</template>

<script>
import GuildInfo from 'components/Guild/GuildInfo'
import GuildRecommend from 'components/Guild/GuildRecommend'
import RewardCard from 'components/Guild/RewardCard'
import SignInCard from 'components/Guild/SignInCard'
import TaskCard from 'components/Guild/TaskCard.vue'
import { guildState } from '@/api/guild'
import { signTask, calculateList } from '@/api/task'
export default {
  name: 'Guild',
  components: {
    GuildInfo,
    GuildRecommend,
    RewardCard,
    SignInCard,
    TaskCard
  },
  data() {
    return {
      signInData: [], // 签到列表
      signTimes: 0, // 联系签到天数
      isSign: 0, // 是否签到
      isOpen: false, // 是否有签到任务
      goldTask: [], // 金币任务
      dayTask: [], // 每日任务
      hasGuild: true, // 是否有公会
      scrollLeft: 0
    }
  },
  computed: {
    // 公会审核状态
    guildStatus() {
      return this.$store.state.guild.guildStatus
    },
    userInfo() {
      return this.$store.state.app.userInfo
    }
  },
  mounted() {
    // this.$upgradeModal.show()
    this.init()
  },
  methods: {
    init() {
      console.log(1)
      this.getSignTask()
      this.calculateList()
      this.guildState()
      this.$store.dispatch('guild/setGuildInfo')
      this.$store.dispatch('app/setUserInfo')
    },
    async getSignTask() {
      const res = await signTask()
      console.log(res)
      if (res.result === '0') {
        this.signInData = res.data.signTasks.map((item, index) => {
          if (index < res.data.signTimes) {
            item.signIn = true
          } else {
            item.signIn = false
          }
          return item
        })
        this.isOpen = !!res.data.isOpen
        this.signTimes = res.data.signTimes
        this.isSign = res.data.isSign
      }
    },
    signIn() {
      const index = this.signInData.findIndex(item => {
        return item.signIn === false
      })
      this.signInData[index].signIn = true
      this.signTimes = this.signTimes + 1
      this.isSign = 1
    },
    async calculateList() {
      const res = await calculateList()
      if (res.result === '0') {
        this.goldTask = res.data.goldTask
        this.dayTask = res.data.dayTask
      }
    },
    async guildState() {
      const res = await guildState()
      console.log(res)
      if (res.result === '0') {
        if (res.data) {
          this.$store.dispatch('guild/setGuildStatus', res.data.guildStatus)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('to', to)
    if (['GuildItem'].includes(to.name)) {
      const keepAlive = this.$store.state.app.keepAlive
      if (!keepAlive.includes('Guild')) {
        keepAlive.push('Guild')
        this.$store.dispatch('app/setKeepAlive', keepAlive)
      }
    } else {
      const keepAlive = this.$store.state.app.keepAlive
      keepAlive.remove('Guild')
    }
    next()
  },
  activated() {
    console.log('activated')
    try {
      document.querySelector(
        '.guild-recommend_list_scroll'
      ).scrollLeft = this.scrollLeft
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
#guild_wrap {
  .guild_top_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 105px;
    background: linear-gradient(90deg, #ed17aa 0%, #1452f5 100%);
  }

  .guild_join {
    width: calc(100% - 40px);
    height: 47px;
    margin: 108px auto 0;
    font-size: 18px;
    line-height: 47px;
    color: #fff;
    text-align: center;
    background: #1452f5;
    border: 1px solid rgba(5, 5, 5, 0.08);
    border-radius: 23px;
  }

  /deep/.card_common:last-of-type {
    margin-bottom: 50px;
  }
}
</style>
