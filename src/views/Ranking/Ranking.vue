<template>
  <div id="ranking" class="ig-wrap">
    <van-tabs
      class="wrap_tab"
      v-model="active"
      color="#fff"
      title-active-color="#fff"
      title-inactive-color="#fff"
      background="transparent"
      sticky
      @change="changeTab"
      @scroll="scroll"
    >
      <van-tab title="公会排行榜">
        <div class="ranking_type" @click="changeRankingType">
          <div class="ranking_type_wrap">
            <div
              class="ranking_type_tab f17"
              :class="{ ranking_type_tab_active: rankingType == 1 }"
              data-ranking-type="1"
            >
              全国排名
            </div>
            <div
              class="ranking_type_tab f17"
              :class="{ ranking_type_tab_active: rankingType == 2 }"
              data-ranking-type="2"
            >
              同城排名
            </div>
          </div>
        </div>
        <van-list
          class="guild_list"
          v-model="loading"
          :finished="isFinished"
          @load="onLoad"
        >
          <template v-if="rankingType == 1">
            <van-cell v-for="(item, index) in guildList" :key="index">
              <div class="common_content" v-if="index == 0">
                <template v-if="vipRole != 4">
                  <p class="common_ranking">
                    {{
                      item.guildRanking
                        ? item.guildRanking > 100
                          ? "未上榜"
                          : item.guildRanking
                        : 1
                    }}
                  </p>
                  <img class="common_avator" :src="item.guildPic" alt="" />
                  <div class="common_name_lever">
                    <p class="common_name f16">{{ item.guildName }}</p>
                    <div class="common_level">
                      <img
                        :src="guildLevelIcon[`LEVEL_${item.guildLv}`]"
                        alt=""
                      />
                      <p>{{ item.guildVipCount ? item.guildVipCount : 0 }}人</p>
                    </div>
                  </div>
                  <div class="common_contribution">
                    <svg-icon icon-class="fire" class="fire_icon"></svg-icon>
                    <p class="common_contribution_number">
                      {{ item.guildContribution }}
                    </p>
                  </div>
                </template>
                <div v-if="vipRole == 4">暂未加入公会</div>
              </div>
              <div class="common_content" v-else @click="toGuildItem(item)">
                <svg-icon
                  v-if="index < 4"
                  icon-class="ranking"
                  class="rank_icon"
                ></svg-icon>
                <p class="common_ranking" v-else>
                  {{ index }}
                </p>
                <img class="common_avator" :src="item.guildPic" alt="" />
                <div class="common_name_lever">
                  <p class="common_name f16">{{ item.guildName }}</p>
                  <div class="common_level">
                    <img
                      :src="guildLevelIcon[`LEVEL_${item.guildLv}`]"
                      alt=""
                    />
                    <p>{{ item.guildVipCount ? item.guildVipCount : 0 }}人</p>
                  </div>
                </div>
                <div class="common_contribution">
                  <svg-icon icon-class="fire" class="fire_icon"></svg-icon>
                  <p class="common_contribution_number">
                    {{ item.guildContribution }}
                  </p>
                </div>
              </div>
            </van-cell>
          </template>
          <template v-if="rankingType == 2">
            <van-cell v-for="(item, index) in guildCityList" :key="index">
              <div class="common_content" v-if="index == 0">
                <template v-if="vipRole != 4">
                  <p class="common_ranking">
                    {{
                      item.guildRanking
                        ? item.guildRanking > 100
                          ? "未上榜"
                          : item.guildRanking
                        : 1
                    }}
                  </p>
                  <img class="common_avator" :src="item.guildPic" alt="" />
                  <div class="common_name_lever">
                    <p class="common_name f16">{{ item.guildName }}</p>
                    <div class="common_level">
                      <img
                        :src="guildLevelIcon[`LEVEL_${item.guildLv}`]"
                        alt=""
                      />
                      <p>{{ item.guildVipCount ? item.guildVipCount : 0 }}人</p>
                    </div>
                  </div>
                  <div class="common_contribution">
                    <svg-icon icon-class="fire" class="fire_icon"></svg-icon>
                    <p class="common_contribution_number">
                      {{ item.guildContribution }}
                    </p>
                  </div>
                </template>
                <div v-if="vipRole == 4">暂未加入公会</div>
              </div>
              <div class="common_content" v-else @click="toGuildItem(item)">
                <svg-icon
                  v-if="index < 4"
                  icon-class="ranking"
                  class="rank_icon"
                ></svg-icon>
                <p class="common_ranking" v-else>
                  {{ index }}
                </p>
                <img class="common_avator" :src="item.guildPic" alt="" />
                <div class="common_name_lever">
                  <p class="common_name f16">{{ item.guildName }}</p>
                  <div class="common_level">
                    <img
                      :src="guildLevelIcon[`LEVEL_${item.guildLv}`]"
                      alt=""
                    />
                    <p>{{ item.guildVipCount ? item.guildVipCount : 0 }}人</p>
                  </div>
                </div>
                <div class="common_contribution">
                  <svg-icon icon-class="fire" class="fire_icon"></svg-icon>
                  <p class="common_contribution_number">
                    {{ item.guildContribution }}
                  </p>
                </div>
              </div>
            </van-cell>
          </template>
        </van-list>
      </van-tab>
      <van-tab title="公会贡献榜">
        <van-list
          class="contribution_list"
          v-model="loading"
          :finished="isFinished"
          @load="onLoad"
        >
          <van-cell v-for="(item, index) in contributionList" :key="index">
            <div v-if="index === 0">
              <template v-if="vipRole != 4">
                <div class="guild_info common_content">
                  <img class="common_avator"   :src="selfGuild.guildPic" alt="" />
                  <div class="common_name_lever">
                    <p class="common_name f16">{{ selfGuild.guildName }}</p>
                    <div class="common_level">
                      <img
                        :src="guildLevelIcon[`LEVEL_${selfGuild.guildLv}`]"
                        alt=""
                      />
                      <p>
                        {{
                          selfGuild.guildVipCount ? selfGuild.guildVipCount : 0
                        }}人
                      </p>
                    </div>
                  </div>
                  <div class="common_contribution">
                    <svg-icon icon-class="fire" class="fire_icon"></svg-icon>
                    <p class="common_contribution_number">
                      {{ selfGuild.guildContribution }}
                    </p>
                  </div>
                </div>
                <div class="guild_up_level">
                  <span>已解锁Lv{{ selfGuild.guildLv }}公会权益</span>
                  <span
                    >距离下次升级还需{{
                      selfGuild.upLvNeedContribution
                    }}贡献值</span
                  >
                </div>
                <div class="common_content">
                  <p class="common_ranking">
                    {{ item.vipContriRanking }}
                  </p>
                  <img class="common_avator"  @click="showPersonalHomepage(item.id)"   :src="item.vipPic" alt="" />
                  <div class="common_name_lever">
                    <p class="common_name self_name">
                      {{ item.vipNick ? item.vipNick : "无名" }} (我)
                    </p>
                    <div class="self_contribution">
                      <svg-icon icon-class="fire" class="fire_icon"></svg-icon>
                      <span>{{ item.vipContributionBalance }}</span>
                    </div>
                  </div>
                  <div
                    class="common_contribution to_self_contribution"
                    @click="toContributionDetail()"
                  >
                    我的贡献
                  </div>
                </div>
              </template>
              <div v-if="vipRole == 4">暂未加入公会</div>
            </div>
            <div class="common_content" v-else>
              <svg-icon
                v-if="index < 4"
                icon-class="ranking"
                class="rank_icon"
              ></svg-icon>
              <p class="common_ranking" v-else>
                {{ index }}
              </p>
              <img class="common_avator"  @click="showPersonalHomepage(item.id)"  :src="item.vipPic" alt="" />
              <div class="common_name_lever">
                <p class="common_name f16">
                  {{ item.vipNick ? item.vipNick : "无名" }}
                </p>
              </div>
              <div class="common_contribution">
                <svg-icon icon-class="fire" class="fire_icon"></svg-icon>
                <p class="common_contribution_number">
                  {{ item.vipContributionBalance }}
                </p>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { guildLevelIcon } from '@/assets/js/constants.js'
import { guildRanking, guildContriRanking } from '@/api/guild'
import { Toast } from 'vant'
export default {
  name: 'Ranking',
  components: {},
  data() {
    return {
      guildLevelIcon: guildLevelIcon,
      active: 0,
      loading: false,
      isFinished: false,
      selfGuild: {},
      guildList: [],
      guildCityList: [],
      contributionList: [],
      rankingType: 1
    }
  },
  computed: {
    vipRole() {
      return this.$store.state.app.userInfo.vipRole
    }
  },
  watch: {
    test() {}
  },
  mounted() {
    this.init()
  },
  methods: {
    showPersonalHomepage(id) {
      this.$router.push({
        path: '/personalHomepage',
        query: {
          userId: id
        }
      })
    },
    toContributionDetail() {
      this.$router.push({
        name: 'GoldCoinDetail',
        params: {
          type: 2
        }
      })
    },
    init() {
      this.active = this.$route.params.type ? this.$route.params.type : 0
      if (this.active == 0) {
        this.guildRanking({
          rankingType: this.rankingType
        })
      } else {
        this.guildContriRanking()
      }
    },
    changeTab(v) {
      if (v == 0) {
        this.guildRanking({
          rankingType: this.rankingType
        })
      } else {
        if (this.vipRole != 4) {
          this.guildContriRanking()
        } else {
          Toast('暂未加入公会')
        }
      }
    },
    changeRankingType(e) {
      console.log(e)
      const rankingType = e.target.dataset.rankingType
      this.rankingType = rankingType
      this.guildRanking({
        rankingType
      })
    },
    onLoad() {},
    scroll() {},
    // 获取排行榜
    async guildRanking({ rankingType }) {
      const res = await guildRanking({
        rankingType
      })
      if (res.result === '0') {
        if (res.data.length > 0) {
          const list = res.data
          this.loading = false
          this.isFinished = true
          if (rankingType === 1) {
            this.guildList = list
          } else {
            this.guildCityList = list
          }
        }
      }
    },
    async guildContriRanking() {
      const res = await guildContriRanking()
      if (res.result === '0') {
        this.selfGuild = res.data.guildInfo
        this.contributionList = res.data.rankingList
        this.loading = false
        this.isFinished = true
      }
    },
    toMyGuild() {},
    toGuildItem(item) {
      const id = item.id
      this.$router.push({
        name: 'GuildItem',
        query: {
          guild_id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#ranking {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #ed17aa 0%, #4545e4 78%, #1452f5 100%);

  .wrap_tab {
    /deep/.van-tabs__wrap {
      height: 60px;
    }
    /deep/.van-tabs__line {
      bottom: 20px;
    }
    /deep/.van-tab__pane {
      padding: 15px;
      box-sizing: border-box;
    }

    .inner_tab {
      position: absolute;
      top: 76px;
      left: 15px;
      z-index: 999;
      width: calc(100% - 30px);

      /deep/.van-tabs__wrap {
        height: 30px;

        .van-tabs__nav {
          width: 188px;

          .van-tab:first-of-type {
            margin-right: 8px;
          }
          .van-tab {
            padding: 5px 15px;
            background-color: #fff;
            border-radius: 12px 12px 0 0;
            box-sizing: border-box;
          }
        }
      }
      /deep/.van-tabs__content {
        padding: 22px 16px;
        background-color: #fff;
        border-radius: 0 12px 12px 12px;
        box-shadow: 0 5px 10px 0 rgba(20, 82, 245, 0.3);
      }
      /deep/.van-tabs__line {
        display: none;
      }
      /deep/.van-tab__pane {
        height: 42px;
        padding: 0;
      }
    }

    .ranking_type {
      .ranking_type_wrap {
        display: flex;
        align-items: center;

        .ranking_type_tab {
          width: 90px;
          height: 30px;
          margin-right: 8px;
          line-height: 30px;
          color: #999999;
          text-align: center;
          background-color: #fff;
          border-radius: 12px 12px 0 0;
        }
      }
      .ranking_type_tab_active {
        color: #1452f5 !important;
      }
    }

    .guild_list,
    .contribution_list {
      height: calc(100vh - 115px);
      //padding-top: 100px;
      //margin-top: 30px;
      overflow: auto;
      background-color: #fff;
      border-radius: 0 12px 12px 12px;

      /deep/.van-cell:first-of-type {
        position: sticky;
        top: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        padding: 24px 16px;
        border-radius: 0.32rem;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
      }
    }

    .contribution_list {
      height: calc(100vh - 85px);
      border-radius: 12px;
    }

    .common_content {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;

      .common_ranking {
        width: 23px;
        margin-right: 16px;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        color: #222222;
        text-align: center;
      }

      .common_avator {
        width: 44px;
        height: 44px;
        margin-right: 16px;
        border-radius: 50%;
        object-fit: cover;
      }

      .common_name_lever {
        text-align: left;
        flex: 1;

        .common_name {
          margin-bottom: 5px;
          font-weight: bold;
          line-height: 18px;
          color: #222222;
          @include textoverflow();
        }

        .self_name {
          color: #1452f5;
        }

        .common_level {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          img {
            width: 70px;
            height: 23px;
          }

          p {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 45px;
            height: 20px;
            font-size: 12px;
            //line-height: 22px;
            text-align: center;
            background: #ffffff;
            border: 1px solid #1452f5;
            border-radius: 10px;
            transform: scale(0.7);
            transform-origin: 50% 60%;
          }
        }
      }

      .common_contribution {
        width: 70px;
        display: flex;
        align-items: center;

        .common_contribution_number {
          font-size: 13px;
          line-height: 18px;
          color: #222222;
        }
      }

      .self_contribution {
        display: flex;
        align-items: center;
      }

      .to_self_contribution {
        height: 21px;
        padding: 0 10px;
        font-size: 12px;
        line-height: 21px;
        color: #1452f5;
        border: 1px solid #1452f5;
        border-radius: 11px;
        box-sizing: border-box;
      }

      .fire_icon {
        font-size: 21px;
      }
    }

    .guild_up_level {
      width: 100%;
      height: 20px;
      padding-left: 10px;
      margin: 6px auto 15px;
      line-height: 20px;
      background-color: #eee;
      border-radius: 5px;
      box-sizing: border-box;

      span:first-of-type {
        font-size: 13px;
        color: #000;
      }
      span:last-of-type {
        font-size: 12px;
        color: #999;
      }
    }
  }

  .rank_icon {
    font-size: 23px;
    margin-right: 16px;
  }
}
.ig-wrap {
  @media screen and (min-width: 769px) {
    /deep/.van-sticky {
      width: 750px !important;
      margin: 0 auto !important;
    }
  }
}
/deep/.van-tab__text {
  font-size: 18px;
}
</style>
