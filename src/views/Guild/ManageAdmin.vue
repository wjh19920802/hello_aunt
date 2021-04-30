<template>
  <div id="manager_member">
    <div class="m_m_top_2">
      <van-field
        class="search_input"
        v-model="searchValue"
        @input="inputSearch"
      >
        <template #button>
          <div class="placeholder" v-show="isShowPlaceholder">
            <svg-icon
              icon-class="search"
              style="font-size: 22px;color: #B2B2B2;vertical-align: middle"
            ></svg-icon>
            <span
              style="position: relative;top: 1px;font-size: 13px;color: #B2B2B2;"
              >搜索</span
            >
          </div>
        </template>
      </van-field>
    </div>
    <div class="m_m_content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          class="m_m_list"
          v-model="loading"
          :finished="isFinished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="m_m_self item_wrap">
            <img class="item_ava" :src="presidentInfo.vipPic" alt="" />
            <div class="item_name">
              <p class="name">
                {{ presidentInfo.vipNick }}
                <span v-if="presidentInfo.id === userInfo.id">(我) </span>
              </p>
              <div class="item_role">
                <p>会长</p>
              </div>
            </div>
          </div>
          <ul class="m_m_list">
            <li
              class="member_item item_wrap admin_item"
              v-for="(item, index) in adminList"
            >
              <svg-icon
                icon-class="minus"
                class="delete_admin"
                @click="deleteAdmin(item, index)"
              ></svg-icon>
              <img class="item_ava" :src="item.vipPic" alt="" />
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
              <div class="item_contribution">
                <svg-icon
                  icon-class="fire"
                  class="item_contribution_icon"
                ></svg-icon>
                <span class="item_contribution_num">{{
                  item.vipContributionBalance
                }}</span>
              </div>
            </li>
          </ul>
          <div
            class="member_item item_wrap"
            v-for="(item, index) in normalMemberList"
          >
            <svg-icon
              icon-class="publish"
              class="add_admin"
              @click="addAdmin(item, index)"
            ></svg-icon>
            <img class="item_ava" :src="item.vipPic" alt="" />
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
            <div class="item_contribution">
              <svg-icon
                icon-class="fire"
                class="item_contribution_icon"
              ></svg-icon>
              <span class="item_contribution_num">{{
                item.vipContributionBalance
              }}</span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getGuildVip, addAdmin, removeAdmin } from 'api/guild'
import { mapGetters } from 'vuex'
export default {
  name: 'ManageAdmin',
  data() {
    return {
      refreshing: false,
      isFinished: false,
      loading: false,
      presidentInfo: {},
      adminList: [],
      normalMemberList: [],
      isShowPlaceholder: true,
      searchValue: '',
      isShowModal: false, // 提示弹窗
      pageNum: 1,
      pageSize: 20
    }
  },
  watch: {
    test() {}
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getPresidentInfo()
    },
    async deleteAdmin(item, index) {
      const res = await removeAdmin({ id: item.id })
      if (res.result === '0') {
        this.adminList.splice(index, 1)
        if (
          this.normalMemberList.findIndex(n => {
            return n.id == item.id
          }) < 0
        ) {
          this.normalMemberList.push(Object.assign(item, { vipRole: 3 }))
        }
      }
    },
    async addAdmin(item, index) {
      const res = await addAdmin({ id: item.id })
      if (res.result === '0') {
        this.normalMemberList.splice(index, 1)
        if (
          this.adminList.findIndex(n => {
            return n.id == item.id
          }) < 0
        ) {
          this.adminList.push(Object.assign(item, { vipRole: 2 }))
        }
      }
    },
    inputSearch(v) {
      if (this.searchValue.length > 0) {
        this.isShowPlaceholder = false
      } else {
        this.isShowPlaceholder = true
      }
      this.pageNum = 1
      this.adminList = []
      this.normalMemberList = []
      this.getAdminList()
      this.getNormalMemberList()
    },
    async getPresidentInfo() {
      const res = await getGuildVip({
        vipRoles: '1,2'
      })
      if (res.result === '0') {
        res.data.list.forEach(item => {
          if (item.vipRole == 1) {
            this.presidentInfo = item
          }
        })
        if (res.data.list.length > 1) {
          this.adminList = res.data.list.filter(item => {
            return item.vipRole == 2
          })
        }
      }
    },
    async getAdminList() {
      const res = await getGuildVip({
        vipRoles: '2'
      })
      if (res.result === '0') {
        this.adminList = res.data.list
      }
    },
    async getNormalMemberList() {
      const res = await getGuildVip({
        vipRoles: '3',
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      if (res.result === '0') {
        if (this.refreshing) {
          this.normalMemberList = []
          setTimeout(() => {
            this.refreshing = false
          }, 500)
        }
        this.normalMemberList = res.data.list
        this.loading = false
        if (res.data.list.length < this.pageSize) {
          this.isFinished = true
        } else {
          this.pageNum += 1
        }
      }
    },
    onLoad() {
      this.getNormalMemberList()
    },
    onRefresh() {
      // 清空列表数据
      this.isFinished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.pageNum = 1
      this.getPresidentInfo()
      this.getAdminList()
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
#manager_member {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;

  .m_m_top_2 {
    display: flex;
    width: 100%;
    height: 51px;
    background-color: #f3f3f3;
    align-items: center;
    justify-content: space-around;

    .search_input {
      position: relative;
      width: 90%;
      height: 28px;
      padding: 0 10px;
      font-size: 13px;
      line-height: 28px;
      color: #b2b2b2;
      text-align: center;
      border: 1px solid #e6e6ea;
      border-radius: 5px;

      .placeholder {
        position: absolute;
        top: 0;
        left: 50%;
        width: 80px;
        height: 100%;
        margin-left: -40px;
        text-align: center;
        pointer-events: none;
      }

      /deep/.van-field__control::placeholder {
        text-align: center;
      }
    }
  }

  .m_m_content {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;

    .m_m_self {
      width: 100%;
      padding: 15px 0;
      border-bottom: 1px solid rgba(199, 199, 199, 0.3);
    }
  }

  .item_wrap {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;

    .delete_admin {
      margin-right: 15px;
      font-size: 18px;
      color: #ff0000;
    }

    .add_admin {
      margin-right: 15px;
      font-size: 18px;
      color: #02bb00;
    }

    .item_select_active {
      background-color: #1452f5;
      border: 1px solid #1452f5;
    }

    .item_ava {
      width: 42px;
      height: 42px;
      margin-right: 14px;
      border-radius: 50%;
    }

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
        transform-origin: 50% 65%;
      }
    }

    .item_contribution {
      width: 70px;
      text-align: left;

      .item_contribution_icon {
        font-size: 21px;
        vertical-align: bottom;
      }
      .item_contribution_num {
        font-size: 13px;
        line-height: 19px;
        color: #222222;
      }
    }
  }

  .member_item {
    margin-top: 15px;
  }

  .admin_item:last-of-type {
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(199, 199, 199, 0.3);
  }

  .make_over_guild {
    width: 300px;
    height: auto;

    .m_o_g_top {
      width: 100%;
      height: 80px;
      padding: 25px 0 15px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
      box-sizing: border-box;
    }

    .m_o_g_bottom {
      display: flex;
      width: 100%;
      height: 50px;
      font-size: 18px;

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
  }
}
</style>
