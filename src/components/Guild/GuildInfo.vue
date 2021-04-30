<template>
  <div id="guild_info_wrap" class="card_common ig_card_common_w">
    <div class="guild_info_sec1">
      <!--        <svg-icon icon-class="guild_1" class="guild_logo"></svg-icon>-->
      <van-image class="guild_logo" fit="cover" :src="guildInfo.guildPic" />
      <div class="guild_name_level">
        <div class="guild_name f15">
          <span>{{ guildInfo.guildName }} </span>
          <img
              style="position: relative; top: 5px; width: 70px"
              :src="guildLevelIcon[`LEVEL_${guildInfo.guildLv}`]"
              alt=""
          />
        </div>
      </div>
      <div>
        <van-button
            class="guild_btn"
            v-if="scene == 2"
            @click="join"
        >加入</van-button
        >
        <van-button
            class="guild_btn"
            v-if="scene == 1 || scene == 3"
            @click="toInvitation"
        >邀请</van-button
        >
      </div>
    </div>
    <div class="guild_info_sec2" v-if="scene == 2 || scene == 3">
      <div class="guild_time_id">
        <div class="guild_time_id_inner">
          <svg-icon
              icon-class="time"
              class="guild_time_id_inner_icon"
          ></svg-icon>
          <span class="guild_time_id_inner_text f15">{{
              guildInfo.createTime && guildInfo.createTime.split(" ")[0]
            }}</span>
        </div>
        <div class="guild_time_id_inner">
          <svg-icon icon-class="id" class="guild_time_id_inner_icon"></svg-icon>
          <span class="guild_time_id_inner_text f15">{{ guildInfo.id }}</span>
        </div>
      </div>
      <div class="guild_desc" v-if="guildInfo.guildInfo">
        <svg-icon icon-class="edit" class="guild_desc_icon"></svg-icon>
        <p class="guild_desc_content f15">{{ guildInfo.guildInfo }}</p>
      </div>
    </div>
    <div class="guild_info_sec3">
      <!-- Start          -->
      <!--  会长 管理员显示待审核人数; 会员显示公会人数      -->
      <div
          class="guild_info_sec3_item"
          v-if="scene == 2 || scene == 3"
          @click="toGuildMember"
      >
        <p class="sec3_item_title">公会成员</p>
        <div class="sec3_item_imgs_wrap sec3_item_center" @scroll="scroll">
          <div class="member_avator_wrap" v-for="item in guildMember">
            <span
                class="member_post"
                v-if="item.vipRole == 1 || item.vipRole == 2"
            >{{ item.vipRole | filterMember }}</span
            >
            <img :src="item.vipPic" alt="" class="member_avator" />
          </div>
        </div>
        <div class="sec3_item_right" v-if="scene == 3">
          <span>{{ memberNum }}</span
          ><span class="right_arrow"></span>
        </div>
      </div>
      <div
          class="guild_info_sec3_item"
          v-if="scene == 1"
          @click="toGuildMember(guildInfo.id, guildInfo.needCheckNum)"
      >
        <p class="sec3_item_title">公会成员</p>
        <div class="to_be_audit sec3_item_center">
          <p>{{ guildInfo.guildVipCount }}</p>
        </div>
        <div class="sec3_item_right">
          <span
              v-if="
              (userInfo.vipRole == 1 && guildInfo.needCheckNum > 0) ||
                (userInfo.vipRole == 2 && guildInfo.needCheckNum > 0)
            "
          >待审核 {{ guildInfo.needCheckNum }} 人</span
          ><span class="right_arrow"></span>
        </div>
        <!-- End          -->
      </div>
      <!--  Start 贡献榜 排行榜    -->
      <div class="guild_info_sec3_item"  v-if="scene != 2" @click="toRanking(0)">
        <p class="sec3_item_title">公会排名</p>
        <div class="guild_ranking sec3_item_center">
          <p>{{ guildInfo.guildRanking }}</p>
        </div>
        <div class="sec3_item_right">
          <span>排行榜</span><span class="right_arrow"></span>
        </div>
      </div>
      <div class="guild_info_sec3_item"  v-else>
        <p class="sec3_item_title">公会排名</p>
        <div class="guild_ranking sec3_item_center">
          <p>{{ guildInfo.guildRanking }}</p>
        </div>
      </div>
      <div class="guild_info_sec3_item" v-if="scene != 2" @click="toRanking(1)">
        <p class="sec3_item_title">公会等级</p>
        <div class="guild_current_level sec3_item_center">
          <div class="guild_current_level_num">
            <p>Lv{{ guildInfo.guildLv }}</p>
          </div>
          <div class="guild_next_level_gap">
            <p>距离升级还需{{ guildInfo.upLvNeedContribution }}贡献值</p>
          </div>
        </div>
        <div class="sec3_item_right">
          <span>贡献榜</span><span class="right_arrow"></span>
        </div>
      </div>
      <div class="guild_info_sec3_item" v-else>
        <p class="sec3_item_title">公会等级</p>
        <div class="guild_current_level sec3_item_center">
          <div class="guild_current_level_num">
            <p>Lv{{ guildInfo.guildLv }}</p>
          </div>
          <div class="guild_next_level_gap">
            <p>距离升级还需{{ guildInfo.upLvNeedContribution }}贡献值</p>
          </div>
        </div>
      </div>
      <!-- End     -->
    </div>
    <div class="guild_info_sec4" v-if="scene == 2 || scene == 3">
      <span class="guild_position_title">公会地点</span
      ><span class="guild_position_content">{{guildInfo.guildProvince + ' ' + guildInfo.guildCity}}</span>
    </div>
    <div
        class="guild_info_sec4"
        v-if="scene == 3 && userInfo.vipRole == 1"
        @click="toMakeOverGuild"
    >
      <span class="guild_position_title">会长管理权转让</span>
      <div class="arrow_wrap"><span class="right_arrow"></span></div>
    </div>
    <div
        class="guild_info_sec4"
        v-if="scene == 3 && userInfo.vipRole == 1"
        @click="toManageAdmin"
    >
      <span class="guild_position_title">公会管理员</span>
      <div class="arrow_wrap"><span class="right_arrow"></span></div>
    </div>
    <div
        class="guild_info_sec4"
        v-if="scene == 3 && (userInfo.vipRole == 2 || userInfo.vipRole == 3)"
        @click="isShowModal = true"
    >
      <span class="guild_position_title">退出公会</span>
      <div class="arrow_wrap"><span class="right_arrow"></span></div>
    </div>
    <van-popup v-model="isShowModal" :round="true">
      <div class="make_over_guild">
        <div class="m_o_g_top">
          <p class="title">退出公会</p>
          <p>退出后您当前积累的贡献值会被清空，加入</p>
          <p>新的公会后重新累计</p>
        </div>
        <div class="m_o_g_bottom f18">
          <div class="m_o_g_btn_left" @click="closeModal">取消</div>
          <div class="m_o_g_btn_right" @click="confirmModal">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { guildLevelIcon } from '@/assets/js/constants'
import { quit } from '@/api/guild'
import { getInfo } from '@/api/app'
export default {
  name: 'GuildInfo',
  props: {
    // 是否从个人中心进入的 个人中心=》我的公会 和 tab栏公会 组件显示状态不同
    scene: {
      type: Number,
      default() {
        return -1
      }
    },
    guildInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    guildMember: {
      type: Array,
      default() {
        return []
      }
    },
    memberNum: {
      type: Number,
      default() {
        return 0
      }
    },
    isSubmit: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      guildLevelIcon: guildLevelIcon,
      isShowModal: false,
      isShowGuide: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {

  },
  methods: {
    join() {
      this.$emit('join')
    },
    toGuildMember(id, num) {
      if (this.userInfo.vipRole != 4 && this.scene != 2) {
        if (num > 0) {
          this.$router.push({
            name: 'GuildMember',
            params: {
              id
            },
            query: {
              activeIndex: 2
            }
          })
        } else {
          this.$router.push({
            name: 'GuildMember',
            params: {
              id
            }
          })
        }
      }
    },
    toRanking(type) {
      this.$router.push({
        name: 'Ranking',
        params: {
          type
        }
      })
    },
    toCreateGuild() {
      this.$router.push({
        name: 'CreateGuild'
      })
    },
    toManageAdmin() {
      this.$router.push({
        name: 'ManageAdmin'
      })
    },
    toMakeOverGuild() {
      this.$router.push({
        name: 'MakeOverGuild'
      })
    },
    toInvitation() {
      this.$router.push({
        name: 'Invitation',
        query: {
          userid: this.$store.state.app.userInfo.id
        }
      })
    },
    closeModal() {
      this.isShowModal = false
    },
    async confirmModal() {
      const res = await quit()
      if (res.result === '0') {
        getInfo().then(res => {
          if (res === 'ok') {
            this.$router.back()
          }
        })
      }
    },
    scroll(e) {
      console.log(e)
    },
    closeGuide() {
      this.isShowGuide = false
    }
  },
  filters: {
    filterMember(v) {
      return v === 1 ? '会长' : v === 2 ? '管理员' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
#guild_info_wrap {
  .guild_info_sec1 {
    display: flex;
    width: 100%;
    height: 59px;
    border-bottom: 1px solid rgba(199, 199, 199, 0.3);
    justify-content: space-between;

    .guild_logo {
      width: 44px;
      height: 44px;
      margin-right: 15px;
      border-radius: 22px;

      /deep/.van-image__img {
        border-radius: 50%;
      }
    }

    .guild_name_level {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 44px;
      margin-right: 10px;

      .guild_name {
        //width: 200px;
        height: 21px;
        font-weight: bold;
        line-height: 21px;
        color: #222222;
        text-align: left;
      }
    }

    .guild_btn {
      position: relative;
      top: 10px;
      right: 0;
      width: 59px;
      height: 21px;
      font-size: 12px;
      text-align: center;
      border: 1px solid #1452f5;
      border-radius: 11px;
    }
  }

  .guild_info_sec2 {
    width: 100%;
    padding: 13px 10px 15px;
    border-bottom: 1px solid rgba(199, 199, 199, 0.3);
    box-sizing: border-box;

    .guild_time_id {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .guild_time_id_inner {
        display: flex;
        width: 50%;
        align-items: center;

        .guild_time_id_inner_icon {
          margin-right: 12px;
          font-size: 24px;
          color: #ed17aa;
        }

        .guild_time_id_inner_text {
          height: 18px;
          line-height: 18px;
          color: #222222;
        }
      }
    }

    .guild_desc {
      display: flex;
      width: 100%;
      margin-top: 10px;

      .guild_desc_icon {
        margin-right: 12px;
        font-size: 24px;
        color: #ed17aa;
      }

      .guild_desc_content {
        line-height: 18px;
        color: #222222;
        text-align: left;
        flex: 1;
        word-break: break-all;
        @include textoverflow(3);
      }
    }
  }

  .guild_info_sec3 {
    width: 100%;
    padding: 15px 0 9px;
    font-size: 15px;
    box-sizing: border-box;

    .guild_info_sec3_item {
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: center;

      .sec3_item_title {
        height: 18px;
        margin-right: 12px;
        font-size: 15px;
        line-height: 18px;
        color: #222222;
      }

      .sec3_item_center {
        display: flex;
        margin-right: 10px;
        font-size: 0;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
      }

      .sec3_item_right {
        position: relative;
        color: #1452f5;

        .right_arrow {
          @include right-arrow();
        }
      }

      .sec3_item_imgs_wrap {
        width: 200px;
        height: 40px;
        overflow: scroll;
        white-space: nowrap;

        .member_avator_wrap {
          position: relative;
          display: flex;
          align-items: center;
          height: 40px;
          margin-right: 4px;

          .member_post {
            position: absolute;
            top: 0;
            left: 50%;
            width: 50px;
            height: 21px;
            font-size: 14px;
            line-height: 21px;
            color: #1452f5;
            background: #ffffff;
            border: 1px solid #1452f5;
            border-radius: 20px;
            transform: scale(0.5) translateX(-50%);
            box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
            transform-origin: 0 0;
          }

          .member_avator {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
      }

      .sec3_item_imgs_wrap::-webkit-scrollbar {
        display: none;
      }

      .guild_ranking,
      .to_be_audit {
        p {
          height: 18px;
          font-size: 15px;
          font-weight: bold;
          line-height: 18px;
          color: #222222;
        }
      }

      .guild_current_level {
        display: flex;
        align-items: center;

        .guild_current_level_num {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 30px;
          height: 13px;
          margin-right: 10px;
          font-weight: bold;
          //line-height: 13px;
          color: #ffffff;
          text-align: center;
          background: #1452f5;
          border-radius: 6px;

          p {
            font-size: 18px;
            transform: scale(0.5);
          }
        }

        .guild_next_level_gap {
          color: #999999;
          text-align: left;
          flex: 1;

          p {
            font-size: 10px;
            line-height: 20px;
            //transform: scale(0.83);
            //transform-origin: 0;
          }
        }
      }
    }

    .guild_info_sec3_item:nth-of-type(2) {
      margin: 5px 0;
    }
  }

  .guild_info_sec4 {
    display: flex;
    padding: 15px 0;
    text-align: left;
    border-top: 1px solid rgba(199, 199, 199, 0.3);
    justify-content: space-between;

    .guild_position_title {
      height: 18px;
      margin-right: 12px;
      font-size: 15px;
      line-height: 18px;
      color: #222222;
    }

    .arrow_wrap {
      width: 100px;
      text-align: right;
    }

    .guild_position_content {
      height: 18px;
      font-size: 13px;
      line-height: 18px;
      color: #999999;
    }

    .right_arrow {
      @include right-arrow(#c5c4c4);
    }
  }
}

.make_over_guild {
  width: 300px;
  height: auto;

  .m_o_g_top {
    width: 100%;
    padding: 10px 0 15px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;

    .title {
      font-size: 18px;
      line-height: 50px;
      color: #000000;
    }
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
    .m_o_g_btn_p {
      width: 100%;
      text-align: center;
      line-height: 50px;
      color: #1452f5;
    }
  }
}

.show_guide {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.7);
  z-index: 999;

  .guide_path {
    width: 80px;
    height: auto;
    position: absolute;
    top: 51px;
    right: 113px;
  }
  .guide_invitation {
    position: absolute;
    top: 40px;
    right: 25px;
    width: 75px;
    height: auto;
  }
  .make_over_guild {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
  }
}
</style>
