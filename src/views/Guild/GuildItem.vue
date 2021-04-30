<template>
  <div id="guild_wrap" class="ig_tab_content_wrap">
    <div class="guild_top_bg"></div>
    <GuildInfo
      :scene="scene"
      :guild-info="guildInfo"
      :guild-member="guildMember"
      :member-num="memberNum"
      @join="join"
    />
    <van-button class="guild_join" @click="join">加入公会</van-button>
    <van-popup v-model="isShowModal" :round="true">
      <div class="guild_join_inner">
        <p class="guild_join_title f18">申请加入公会</p>
        <van-field
          class="f16"
          v-model="auditDesc"
          rows="4"
          autosize
          type="textarea"
          maxlength="100"
          :placeholder="placeholder"
          show-word-limit
        />
        <div class="m_o_g_bottom f18">
          <div class="m_o_g_btn_left" @click="isShowModal = false">取消</div>
          <div class="m_o_g_btn_right" @click="joinGuild">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import GuildInfo from '@/components/Guild/GuildInfo'
import { getGuildInfoById, getGuildVip, join } from '@/api/guild'
import { Toast } from 'vant'
export default {
  name: 'GuildItem',
  components: {
    GuildInfo
  },
  data() {
    return {
      scene: 2,
      guildInfo: {},
      guildMember: [],
      memberNum: 0,
      isShowModal: false,
      auditDesc: '',
      placeholder: '请填写申请说明',
      isSubmit: false // 是否已经提交加入申请
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo
    }
  },
  watch: {
    test() {}
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    async init() {
      this.auditDesc = '你好,我是' + this.$store.state.app.userInfo.vipNick
      this.isShowModal = this.$route.query.isShow === 1
      const vipGuildId = this.$route.query.guild_id
      this.getGuildInfoById(vipGuildId)
      this.getGuildVip(vipGuildId)
    },
    async getGuildInfoById(guildId) {
      const res = await getGuildInfoById({
        guildId
      })
      if (res.result === '0') {
        this.guildInfo = res.data
      }
    },
    async getGuildVip(vipGuildId) {
      const res = await getGuildVip({
        vipGuildId,
        vipRoles: '1,2'
      })
      if (res.result === '0') {
        this.guildMember = res.data.list
        this.memberNum = Number(res.data.total)
      }
    },
    async postJoin({ sceneCode, guildId, auditDesc }) {
      const res = await join({
        sceneCode,
        guildId,
        auditDesc
      })
      if (res.result === '0') {
        this.isShowModal = false
        if (sceneCode && sceneCode.indexOf('H') === 0) {
          Toast({
            message: '加入成功'
          })
          return
        } else {
          Toast({
            message: '提交成功，审核中'
          })
          return
        }
      } else {
        this.isShowModal = false
        Toast({
          message: res.msg
        })
      }
    },
    async joinGuild() {
      const guildId = this.$route.query.guild_id
      const auditDesc = this.auditDesc
      const sceneCode = decodeURIComponent(this.$route.query.sceneCode)
      if (auditDesc === '') {
        Toast('请填写入会申请')
        return
      }
      if (sceneCode && sceneCode.indexOf('U') === 0) {
        this.postJoin({
          sceneCode,
          guildId,
          auditDesc
        })
      } else {
        this.postJoin({
          guildId,
          auditDesc
        })
      }
    },
    async join() {
      const sceneCode = decodeURIComponent(this.$route.query.sceneCode)
      if (this.userInfo.vipRole != 4) {
        Toast('您已有所属公会，无法申请加入')
      } else {
        if (sceneCode && sceneCode.indexOf('H') === 0) {
          this.postJoin({
            sceneCode
          })
        } else {
          this.isShowModal = true
        }
      }
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
    width: 335px;
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

  .guild_join_inner {
    width: 300px;
    height: auto;

    .guild_join_title {
      line-height: 50px;
      color: #000000;
    }

    .m_o_g_bottom {
      display: flex;
      width: 100%;
      height: 50px;

      .m_o_g_btn_left {
        width: 50%;
        height: 50px;
        line-height: 50px;
        color: #999999;
        text-align: center;
        background-color: #fff;
      }
      .m_o_g_btn_right {
        width: 50%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
        background-color: #1452f5;
      }
    }

    /deep/textarea {
      padding: 10px 12px;
      color: rgb(199, 199, 199);
      border: 1px solid rgba(199, 199, 199, 0.3);
    }
  }
}
</style>
