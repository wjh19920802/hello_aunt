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
            <svg-icon icon-class="search" style="font-size: 22px;color: #B2B2B2;vertical-align: middle"></svg-icon>
            <span style="font-size: 13px;color: #B2B2B2;position: relative;top: 1px;">搜索</span>
          </div>
        </template>
      </van-field>
    </div>
    <div class="m_m_content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="m_m_self item_wrap">
          <img class="item_ava" :src="presidentInfo.vipPic" alt="" />
          <div class="item_name">
            <p class="name">{{ presidentInfo.vipNick }} <span v-if="presidentInfo.id === userInfo.id">(我) </span></p>
            <div class="item_role">
              <p>会长</p>
            </div>
          </div>
        </div>
        <van-list
            class="m_m_list"
            v-model="loading"
            :finished="isFinished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <div class="member_item item_wrap" v-for="(item, index) in memberList" @click="showModal(item)">
            <div class="item_select" :class="{ 'item_select_active': currentItem.id == item.id }"></div>
            <img class="item_ava" :src="item.vipPic" alt="" />
            <div class="item_name">
              <p class="name">{{ item.vipNick }} <span v-if="item.id === userInfo.id">(我) </span></p>
              <div class="item_role">
                <p>
                  {{ item.vipRole == 1 ? "会长" : item.vipRole == 2 ? "管理员" : "会员" }}
                </p>
              </div>
            </div>
            <div class="item_contribution">
              <svg-icon icon-class="fire" class="item_contribution_icon"></svg-icon>
              <span class="item_contribution_num">{{item.vipContributionBalance}}</span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup v-model="isShowModal" :round="true">
      <div class="make_over_guild">
        <div class="m_o_g_top">
          <p>将公会会长身份转让给{{currentItem.vipNick}}，</p>
          <p>你将失去会长身份</p>
        </div>
        <div class="m_o_g_bottom f18">
          <div class="m_o_g_btn_left" @click="closeModal">取消</div>
          <div class="m_o_g_btn_right" @click="makeOverGuild">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGuildVip, transfer } from 'api/guild'
import { Toast } from 'vant'
import config from '@/config'
export default {
  name: 'MakeOverGuild',
  data() {
    return {
      presidentInfo: {},
      memberList: [],
      // 会长转让
      searchValue: '',
      isShowPlaceholder: true,
      currentItem: {}, // 转让会长点击id
      isShowModal: false, // 提示弹窗
      pageSize: 20,
      pageNum: 1,
      loading: false,
      isFinished: false,
      refreshing: false
    }
  },
  watch: {
    test() {}
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    })
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getPresidentInfo()
    },
    /**
     *公会管理权转让
     */
    showModal(item) {
      this.isShowModal = true
      this.currentItem = item
    },
    closeModal() {
      this.isShowModal = false
      this.currentItem = {}
    },
    inputSearch() {
      if (this.searchValue.length > 0) {
        this.isShowPlaceholder = false
      } else {
        this.isShowPlaceholder = true
      }
      this.pageNum = 1
      this.getGuildVip()
    },
    async makeOverGuild() {
      const id = this.currentItem.id
      const res = await transfer({
        transferVipId: id
      })
      if (res.result === '0') {
        Toast('转让成功')
        setTimeout(() => {
          window.localStorage.removeItem('access_token')
          if (config.NODE_ENV === 'development') {
            window.location = '/index'
          } else {
            window.location = '/app/index'
          }
        }, 1000)
      }
    },
    async getGuildVip() {
      const res = await getGuildVip({
        idOrName: this.searchValue,
        vipRoles: '2,3',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
      if (res.result === '0') {
        if (this.refreshing) {
          this.memberList = []
          setTimeout(() => {
            this.refreshing = false
          }, 500)
        }
        this.memberList = this.memberList.concat(res.data.list)
        this.loading = false
        if (res.data.list.length < this.pageSize) {
          this.isFinished = true
        }
      }
    },
    async getPresidentInfo() {
      const res = await getGuildVip({
        vipRoles: '1',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      })
      if (res.result === '0') {
        this.presidentInfo = res.data.list[0]
      }
    },
    onLoad() {
      this.getGuildVip()
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
#manager_member {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;

  .m_m_top_2 {
    width: 100%;
    height: 51px;
    background-color: #F3F3F3;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .search_input {
      position: relative;
      width: 90%;
      height: 28px;
      line-height: 28px;
      border-radius: 5px;
      border: 1px solid #E6E6EA;
      padding: 0 10px;
      text-align: center;
      font-size: 13px;
      color: #B2B2B2;

      .placeholder {
        position: absolute;
        width: 80px;
        height: 100%;
        top: 0;
        left: 50%;
        text-align: center;
        margin-left: -40px;
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
      border-bottom: 1px solid rgba(199, 199, 199, .3);
    }
  }

  .item_wrap {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;

    .item_select {
      width: 8px;
      height: 8px;
      margin-right: 12px;
      border-radius: 8px;
      border: 1px solid #999999;
    }

    .item_select_active {
      background-color: #1452F5;
      border: 1px solid #1452F5;
    }

    .item_ava {
      width: 42px;
      height: 42px;
      margin-right: 13px;
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
        color: #222222;
        line-height: 19px;
      }
    }
  }

  .member_item {
    margin-top: 15px;
  }

  .make_over_guild {
    width: 300px;
    height: auto;

    .m_o_g_top {
      width: 100%;
      height: 80px;
      padding: 25px 0 15px;
      line-height: 20px;
      background-color: #fff;
      border-bottom: 1px solid #E5E5E5;
      box-sizing:  border-box;
      text-align: center;
      font-size: 16px;
    }

    .m_o_g_bottom {
      width: 100%;
      height: 50px;
      display: flex;

      .m_o_g_btn_left {
        width: 50%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        color: #999999;
      }
      .m_o_g_btn_right {
        width: 50%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #1452F5;
        color: #fff;
      }
    }
  }
}
</style>
