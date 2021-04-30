<template>
  <div id="guild_member_wrap">
    <van-tabs
      v-model="active"
      v-if="userInfo.vipRole == 1 || userInfo.vipRole == 2"
      background="#fff"
      color="#1452F5"
      title-active-color="#1452F5"
      sticky
      swipeable
      @change="changeTab"
    >
      <van-tab title="全部">
        <div class="search_input">
          <van-field
            class="guild-recommend_input f14"
            v-model="searchValue"
            placeholder="搜索公会成员"
            left-icon="search"
            clearable
            clickable
            @input="search"
          />
          <span class="search_cancel" @click="toManageMember">管理</span>
        </div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            class="member_wrap all_list"
            v-model="loading"
            :finished="isFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(item, index) in allList"
              :key="index"
              :class="{ is_admin: item.vipRole != 3 }"
            >
              <div class="member_item item_wrap" @click="showPersonalHomepage(item.id)">
                <img
                  class="item_ava"
                  :src="item.vipPic"
                  alt=""
                />
                <div class="item_name">
                  <p class="name">
                    {{ item.vipNick }}
                    <span v-if="item.id === userInfo.id">(我) </span>
                  </p>
                  <div class="item_role">
                    <p>
                      {{
                        item.vipRole == 1
                          ? "会长"
                          : item.vipRole == 2
                          ? "管理员"
                          : "会员"
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="line"
                v-if="
                  allList[index].vipRole != 3 &&
                  (!allList[index + 1] || allList[index + 1].vipRole == 3)
                "
              ></div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="待审核">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            class="member_wrap audit_list"
            v-model="loading"
            :finished="isFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in auditList" :key="index">
              <div class="audit_item item_wrap" @click="showPersonalHomepage(item.vipId)">
                <img class="item_ava" :src="item.vipPic" alt="" />
                <div class="item_info">
                  <div class="item_info_name">
                    <span class="item_info_name_s1">{{ item.vipNick }}</span>
                    <span class="item_info_name_s2">申请加入公会</span>
                  </div>
                  <div class="item_info_desc">{{ item.auditDesc }}</div>
                </div>
                <div class="item_btn" :class="{ item_agree: item.isAgree }">
                  <p v-if="item.isAgree == 1">已同意</p>
                  <p v-else-if="item.isAgree == 2">已拒绝</p>
                  <p v-else @click.stop="showModal(item)">审核</p>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <template v-else>
      <div class="search_input" :class="{'top_0': userInfo.vipRole == 3}">
        <van-field
          class="guild-recommend_input f14"
          v-model="searchValue"
          placeholder="搜索公会成员"
          left-icon="search"
          clearable
          clickable
          @input="search"
        />
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          class="member_wrap normal_member_wrap"
          v-model="loading"
          :finished="isFinished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="all_list">
            <van-cell
              v-for="(item, index) in allList"
              :key="index"
              :class="{ is_admin: item.vipRole != 3 }"
            >
              <div class="member_item item_wrap" @click="showPersonalHomepage(item.id)" >
                <img class="item_ava"   :src="item.vipPic" alt="" />
                <div class="item_name">
                  <p class="name">
                    {{ item.vipNick }}
                    <span v-if="item.id === userInfo.id">(我) </span>
                  </p>
                  <div class="item_role">
                    <p>
                      {{
                        item.vipRole == 1
                          ? "会长"
                          : item.vipRole == 2
                          ? "管理员"
                          : "会员"
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="line"
                v-if="
                  allList[index].vipRole != 3 &&
                  (!allList[index + 1] || allList[index + 1].vipRole == 3)
                "
              ></div>
            </van-cell>
          </div>
        </van-list>
      </van-pull-refresh>
    </template>
    <van-popup v-model="isShowModal" round>
      <div class="guild_join_inner">
        <p class="guild_join_title f18">申请加入公会</p>
        <van-field
          class="f16"
          v-model="currentItem.auditDesc"
          disabled
          rows="4"
          autosize
          type="textarea"
        />
        <div class="m_o_g_bottom f18">
          <div class="m_o_g_btn_left" @click="refuse">拒绝</div>
          <div class="m_o_g_btn_right" @click="agree">通过</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getGuildVip, audit, getAuditVipRecord } from '@/api/guild'
export default {
  name: 'GuildMember',
  components: {},
  data() {
    return {
      active: 0,
      loading: false,
      isFinished: false,
      refreshing: false,
      searchValue: '',
      pageSize: 20,
      pageNum: 1,
      allList: [],
      auditList: [],
      srcollObj: {},
      isShowModal: false,
      currentItem: {}
    }
  },
  watch: {},
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo
    }
  },
  mounted() {
    // console.log("获取传入的值",this.$route.query.activeIndex);
    if (
      !(
        !this.$route.query.activeIndex &&
        typeof this.$route.query.activeIndex !== 'undefined' &&
        this.$route.query.activeIndex != 0
      )
    ) {
      if (this.$route.query.activeIndex == 2) {
        this.pageNum = 1
        this.isFinished = false
        this.allList = []
        this.active = 1
      }
    }
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
    changeTab(v) {
      this.pageNum = 1
      this.isFinished = false
      this.allList = []
    },
    toManageMember() {
      this.$router.push({
        name: 'ManageMember'
      })
    },
    async getAuditVipRecord() {
      const res = await getAuditVipRecord({
        auditStatus: 0
      })
      if (res.result === '0') {
        if (this.refreshing) {
          this.auditList = []
          setTimeout(() => {
            this.refreshing = false
          }, 500)
        }
        this.auditList = res.data.list
        this.isFinished = true
        this.loading = false
      }
    },
    showModal(item) {
      this.currentItem = item
      this.isShowModal = true
    },
    async agree() {
      const id = this.currentItem.id
      const res = await audit({
        auditType: 1,
        auditRecordId: id
      })
      if (res.result === '0') {
        for (let i = 0; i < this.auditList.length; i++) {
          if (this.auditList[i].id == id) {
            this.auditList[i].isAgree = 1
            this.isShowModal = false
            return
          }
        }
      }
    },
    async refuse() {
      const id = this.currentItem.id
      const res = await audit({
        auditType: 2,
        auditRecordId: id
      })
      if (res.result === '0') {
        for (let i = 0; i < this.auditList.length; i++) {
          if (this.auditList[i].id == id) {
            this.auditList[i].isAgree = 2
            this.isShowModal = false
            return
          }
        }
      }
    },
    search() {
      this.pageNum = 1
      this.allList = []
      this.getGuildVip({
        idOrName: this.searchValue,
        vipRole: -4
      })
    },
    async getGuildVip({ idOrName }) {
      const res = await getGuildVip({
        idOrName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      if (res.result === '0') {
        if (this.refreshing) {
          this.allList = []
          setTimeout(() => {
            this.refreshing = false
          }, 500)
        }
        this.allList = this.allList.concat(res.data.list)
        this.loading = false
        if (res.data.list.length < this.pageSize) {
          this.isFinished = true
        } else {
          this.pageNum += 1
        }
      }
    },
    onLoad() {
      if (!this.isFinished) {
        if (this.active === 0) {
          this.getGuildVip({ idOrName: this.searchValue })
        } else {
          this.getAuditVipRecord()
        }
      }
    },
    onRefresh() {
      // 清空列表数据
      this.isFinished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.pageNum = 1
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
#guild_member_wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  /deep/.van-tabs__wrap {
    height: 60px;
  }
  /deep/.van-tabs__line {
    bottom: 20px;
  }

  .member_wrap {
    background-color: #f3f3f3;
    box-sizing: border-box;

    /deep/.van-cell {
      background-color: #f3f3f3;
    }

    .item_wrap {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;

      .item_ava {
        width: 42px;
        height: 42px;
        margin-right: 13px;
        border-radius: 50%;
      }
    }

    .member_item {
      position: relative;
      .item_name {
        display: flex;
        flex: 1;
        align-items: center;

        .name {
          font-size: 15px;
          line-height: 21px;
          color: #222222;
        }

        .item_role {
          width: 60px;
          height: 24px;
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;
          color: #ffffff;
          text-align: center;
          background: #1452f5;
          border-radius: 14px;
          transform: scale(0.5);
        }
      }
    }

    .audit_item {
      justify-content: space-between;
      .item_info {
        flex: 1;

        .item_info_name {
          margin-bottom: 2px;
          font-size: 14px;
          line-height: 20px;

          .item_info_name_s1 {
            color: #1452f5;
          }

          item_info_name_s2 {
            color: #222222;
          }
        }

        .item_info_desc {
          font-size: 13px;
          line-height: 18px;
          color: #999999;
        }
      }

      .item_btn {
        p {
          width: 58px;
          height: 21px;
          font-size: 12px;
          line-height: 21px;
          color: #1452f5;
          text-align: center;
          border: 1px solid #1452f5;
          border-radius: 10px;
        }
      }
      .item_agree {
        p {
          color: #c1c1c1;
          border: 0.02667rem solid #c1c1c1;
        }
      }
    }
  }

  .audit_list {
    /deep/.van-cell {
      background-color: #fff;
    }
  }

  .search_input {
    position: sticky;
    top: 59px;
    z-index: 99;
    display: flex;
    width: 100%;
    padding: 8px;
    background-color: #f3f3f3;
    box-sizing: border-box;
    justify-content: space-around;
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

    /deep/.van-icon {
      font-size: 20px;
      color: #999999;
    }
  }

  .top_0 {
    top: 0!important;
  }

  .normal_member_wrap {
    .search_input {
      top: 0;
    }
  }

  .is_admin {
    /deep/.van-cell__value {
      overflow: initial;
    }
    .line {
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(199, 199, 199, .3);
    }
  }

  .guild_join_inner {
    width: 300px;
    height: auto;

    .guild_join_title {
      color: #000000;
      line-height: 50px;
    }

    .m_o_g_bottom {
      width: 100%;
      height: 50px;
      display: flex;

      .m_o_g_btn_left {
        width: 50%;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        color: #999999;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
      }
      .m_o_g_btn_right {
        width: 50%;
        line-height: 50px;
        text-align: center;
        background-color: #1452f5;
        color: #fff;
      }
    }

    /deep/textarea {
      border: 1px solid rgba(199,199,199,.3);
      padding: 10px 12px;
    }
  }
}
</style>
