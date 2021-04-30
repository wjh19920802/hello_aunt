<template>
  <div id="search_wrap">
    <div class="search_input">
      <van-field
        class="guild-recommend_input f14"
        v-model="guildIdOrName"
        placeholder="搜索公会ID/名称"
        left-icon="search"
        clearable
        clickable
        @input="input"
      />
      <span class="search_cancel" @click="cancel">取消</span>
    </div>
    <van-list
      class="search_list"
      v-model="loading"
      :finished="isFinished"
      :finished-text="finishedText"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in guildList" :key="index">
        <div class="search_list_item">
          <img class="item_ava" :src="item.guildPic" alt="" />
          <div class="item_name">
            <p class="name">{{ item.guildName }}</p>
            <img
                style="width: 70px;position: relative;top: 5px;"
                :src="guildLevelIcon[`LEVEL_${item.guildLv}`]"
                alt=""
            />
          </div>
          <div class="item_is_full" :class="{ item_full: item.guild_vip_count == 300 }">
            <p class="full" v-if="item.guild_vip_count == 300">满员</p>
            <p class="join_in" v-else @click="toGuildItem(item)">加入</p>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import img from '@/assets/avator_position.png'
import { queryGuildList } from '@/api/guild'
import { guildLevelIcon } from 'assets/js/constants'
export default {
  name: 'Search',
  components: {},
  data() {
    return {
      guildLevelIcon: guildLevelIcon,
      guildIdOrName: '',
      loading: false,
      isFinished: true,
      guildList: [],
      pageNum: 1,
      pageSize: 20,
      finishedText: '没有找到您搜索的内容'
    }
  },
  watch: {
    test() {}
  },
  mounted() {},
  methods: {
    onLoad() {
      if (!this.isFinished) {
        this.pageNum += 1
        this.queryGuildList()
      }
    },
    input() {
      this.pageNum = 1
      this.guildList = []
      this.queryGuildList()
    },
    async queryGuildList() {
      const res = await queryGuildList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        guildIdOrName: this.guildIdOrName
      })
      if (res.result === '0') {
        this.guildList = this.guildList.concat(res.data.list)
        if (res.data.list.length < this.pageSize) {
          this.isFinished = true
        } else {
          this.isFinished = false
        }
        if (this.guildList.length == 0) {
          this.finishedText = '没有找到您搜索的内容'
        } else {
          this.finishedText = '没有更多搜索的内容'
        }
      }
    },
    getGuildList() {
      this.queryGuildList()
    },
    toGuildItem(item) {
      this.$router.push({
        name: 'GuildItem',
        query: {
          guild_id: item.id,
          isShow: 1
        }
      })
    },
    cancel() {
      this.guildIdOrName = ''
      this.guildList = []
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('to', to)
    if (['GuildItem'].includes(to.name)) {
      const keepAlive = this.$store.state.app.keepAlive
      if (!keepAlive.includes('Search')) {
        keepAlive.push('Search')
        this.$store.dispatch('app/setKeepAlive', keepAlive)
      }
    } else {
      const keepAlive = this.$store.state.app.keepAlive
      keepAlive.remove('Search')
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
#search_wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .search_input {
    position: sticky;
    top: 0;
    z-index: 99;
    display: flex;
    width: 100%;
    padding: 8px;
    background-color: #f3f3f3;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;

    .guild-recommend_input {
      width: calc(100% - 40px);
      padding: 2px 7px;
      background-color: #fff;
      border-radius: 11px;
    }

    .search_cancel {
      font-size: 16px;
      line-height: 22px;
      color: #222222;
    }
  }

  .search_list {
    width: 100%;

    .search_list_item {
      display: flex;
      width: 100%;
      //padding: 15px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;

      .item_ava {
        width: 43px;
        height: 43px;
        margin-right: 15px;
        border-radius: 50%;
        object-fit: cover;
      }

      .item_name {
        flex: 1;
      }

      .item_is_full {
        p {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 58px;
          height: 21px;
          font-size: 12px;
          color: #1452f5;
          text-align: center;
          border: 1px solid #1452f5;
          border-radius: 10px;
        }
      }

      .item_full {
        p {
          color: #c1c1c1;
          border: 0.02667rem solid #c1c1c1;
        }
      }
    }
  }
}
</style>
