<template>
  <div id="self_guild">
    <div class="self_guild_top ig-self_guild_top"></div>
    <GuildInfo
      :scene="scene"
      :guild-info="guildInfo"
      :guild-member="guildMember"
      :member-num="guildInfo.guildVipCount"
    />
    <van-button
      class="edit_guild"
      @click="toEditGuild"
      v-if="userInfo.vipRole == 1"
      >编辑资料</van-button
    >
  </div>
</template>

<script>
import GuildInfo from '@/components/Guild/GuildInfo'
import { getGuildDetail, getGuildVip } from 'api/guild'
export default {
  name: 'SelfGuild',
  components: {
    GuildInfo
  },
  data() {
    return {
      scene: 3,
      guildMember: [],
      memberNum: 0
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo
    },
    guildInfo() {
      return this.$store.state.guild.guildInfo
    }
  },
  watch: {
    test() {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getGuildVip()
      this.$store.dispatch('guild/setGuildInfo')
    },
    async getGuildVip(vipGuildId) {
      const res = await getGuildVip({
        vipGuildId,
        vipRoles: '1,2'
      })
      if (res.result === '0') {
        this.guildMember = res.data.list
      }
    },
    toEditGuild() {
      this.$router.push({
        name: 'CreateGuild',
        query: {
          type: 'edit'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#self_guild {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.self_guild_top {
  position: absolute;
  top: 0;
  left: 50%;
  width: 500px;
  height: 194px;
  margin-left: -250px;
  background: linear-gradient(90deg, #ed17aa 0%, #1452f5 100%);
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
@media screen and (min-width: 769px) {
  .ig-self_guild_top {
    width: 130% !important;
    margin-left: -65%;
  }
}
.edit_guild {
  width: calc(100% - 40px);
  height: 47px;
  margin-top: 45px;
  font-size: 18px;
  line-height: 47px;
  color: #ffffff;
  text-align: center;
  background: #1452f5;
  border: 1px solid rgba(5, 5, 5, 0.08);
  border-radius: 24px;
}
</style>
