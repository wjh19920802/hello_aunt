<template>
  <div id="guild-recommend_card_wrap" class="card_common ig_card_common_w">
    <div class="guild-recommend_card_top">
      <span class="guild-recommend_tips f17">您当前还没有加入公会</span>
      <div
        class="guild-recommend_btn f13"
        v-if="userInfo.vipRole === 4 || userInfo.vipRole === null"
        @click="toCreateGuild"
      >
        创建
      </div>
      <div class="guild-recommend_btn f13" v-else>邀请</div>
    </div>
    <div class="guild-recommend_search">
      <van-field
        class="guild-recommend_input f14"
        v-model="searchValue"
        placeholder="搜索公会ID/名称"
        left-icon="search"
        clickable
        @click="toSearch"
      />
    </div>
    <div class="guild-recommend_content">
      <div class="guild-recommend_content_top">
        <span class="f16">推荐公会</span>
        <span @click="toRanking">
          <span class="to_ranking f16">公会排行榜</span>
          <span class="right_arrow"></span>
        </span>
      </div>
      <div class="guild-recommend_list_scroll" @scroll="scroll">
        <div class="guild-recommend_list">
          <div
            class="guild-recommend_list_item"
            v-for="(item,index) in guildRecommendList"
            @click="toGuildItem(item)"
            :key="index"
          >
            <van-image class="guild_image" fit="cover" :src="item.guildPic">
              <template>
                <div class="guild_level">
                  <p>Lv{{ item.guildLv }}</p>
                </div>
              </template>
            </van-image>
            <p class="guild_name">{{ item.guildName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img from '@/assets/test.jpeg'
import { mapGetters } from 'vuex'
import { recommendGuild } from '@/api/guild'
export default {
  name: 'GuildRecommend',
  props: {},
  data() {
    return {
      searchValue: '',
      isLoading: false,
      pageSize: 10,
      pageNum: 1,
      guildRecommendList: []
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
    img() {
      return img
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.recommendGuild()
    },
    scroll() {
      const scrollLeft = document.querySelector('.guild-recommend_list_scroll')
        .scrollLeft
      this.$emit('getScrollLeft', scrollLeft)
      const wrapWidth = document.querySelector('.guild-recommend_list_scroll')
        .clientWidth
      const scrollWidth = document.querySelector('.guild-recommend_list')
        .scrollWidth
      if (scrollWidth - wrapWidth - scrollLeft < 50) {
        if (!this.isLoading) {
          this.isLoading = true
          this.recommendGuild()
        }
      }
    },
    async recommendGuild() {
      const res = await recommendGuild({
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
      if (res.result === '0') {
        console.log(res.data)
        this.guildRecommendList = this.guildRecommendList.concat(res.data.list)
        this.pageNum += 1
        if (res.data.list.length < this.pageSize || res.data.isLastPage) {
          this.isLoading = true
        } else {
          this.isLoading = false
        }
      }
    },
    toSearch() {
      this.$router.push({
        name: 'Search'
      })
    },
    toGuildItem(item) {
      this.$router.push({
        name: 'GuildItem',
        query: {
          guild_id: item.id
        }
      })
    },
    toCreateGuild() {
      this.$router.push({
        name: 'CreateGuild'
      })
    },
    toRanking() {
      this.$router.push({
        name: 'Ranking'
      })
    },
    toEdge(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
#guild-recommend_card_wrap {
  .guild-recommend_card_top {
    display: flex;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgba(199, 199, 199, .3);
    justify-content: space-between;

    .guild-recommend_tips {
      height: 21px;
      font-weight: bold;
      line-height: 21px;
      color: #999999;
    }

    .guild-recommend_btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 58px;
      height: 21px;
      color: #1452f5;
      text-align: center;
      border: 1px solid #1452f5;
      border-radius: 10px;
    }
  }

  .guild-recommend_search {
    .guild-recommend_input {
      width: 100%;
      padding: 2px 7px;
      margin-bottom: 15px;
      background-color: #f2f2f2;
      border-radius: 11px;
    }

    /deep/.van-icon {
      font-size: 20px;
      color: #999999;
    }
  }

  .guild-recommend_content {
    .guild-recommend_content_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;

      span {
        line-height: 18px;
        color: #222222;
      }

      .to_ranking {
        color: #1452f5;
      }

      .right_arrow {
        vertical-align: baseline;
        @include right-arrow(#c5c4c4);
      }
    }

    .guild-recommend_list_scroll {
      width: 100%;
      overflow-x: auto;

      .guild-recommend_list {
        width: auto;
        white-space: nowrap;

        .guild-recommend_list_item {
          display: inline-block;
          width: 115px;
          margin-right: 6px;
          overflow: hidden;
          font-size: 0;
          white-space: initial;
          border-radius: 12px;
          vertical-align: top;
          .guild_image {
            position: relative;
            width: 115px;
            height: 115px;
            vertical-align: top;
            /deep/.guild_level {
              position: absolute;
              top: 6px;
              left: 6px;
              z-index: 9;
              width: 25px;
              height: 13px;
              line-height: 13px;
              color: #1452f5;
              text-align: center;
              background-color: #fff;
              border: 1px solid #1452f5;
              border-radius: 6px;
              box-sizing: border-box;

              p {
                font-size: 12px;
                transform: scale(0.75);
                transform-origin: 50% 0;
              }
            }
          }

          .guild_name {
            width: 100%;
            height: 36px;
            padding: 0 2px;
            font-size: 14px;
            line-height: 36px;
            color: #222222;
            text-align: center;
            background-color: #f2f2f2;
            box-sizing: border-box;
            @include textoverflow(1);
          }
        }
      }
    }

    .guild-recommend_list_scroll::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
