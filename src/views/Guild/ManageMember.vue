<template>
  <div id="manager_member">
    <div class="m_m_top_1">
      <div class="list_rank" @click="changeOrder">
        <span class="list_rank_text">贡献值排序</span>
        <div class="list_rank_icon" :class="{'is_asc': !!orderBy }">
          <div class="ig-list_rank_asc"></div>
          <div class="ig-list_rank_desc"></div>
        </div>
      </div>
      <div class="move_out" @click="moveOutMember">移除</div>
    </div>
    <div class="m_m_content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="m_m_self item_wrap">
          <img class="item_ava" :src="presidentInfo.vipPic" alt="" />
          <div class="item_name">
            <p class="name">{{ presidentInfo.vipNick }}</p>
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
          <div class="member_item item_wrap" v-for="(item, index) in memberList" @click="select(item.id)">
            <div class="ig-item_select" v-if="userInfo.vipRole == 1 ||  item.vipRole != 2 " :class="{ 'item_select_active': selectArr.includes(item.id) }"></div>
            <div class="ig-position" v-else></div>
            <img class="item_ava" :src="item.vipPic" alt="" />
            <div class="item_name">
              <p class="name">{{ item.vipNick }}</p>
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
  </div>
</template>

<script>
import { Toast } from 'vant'
import { getGuildVip, remove } from 'api/guild'
export default {
  name: 'ManageMember',
  data() {
    return {
      isAsc: false, // false=》降序 ； true=》升序
      orderBy: 0, // 0 降序 1 升序
      presidentInfo: {},
      loading: false,
      isFinished: false,
      refreshing: false,
      pageNum: 1,
      pageSize: 20,
      memberList: [],
      selectArr: []
    }
  },
  watch: {
    test() {}
  },
  computed: {
    userInfo() {
      return this.$store.state.app.userInfo
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 成员管理移除
     */
    init() {
      this.getGuildPresidentInfo()
    },
    select(id) {
      if (this.selectArr.includes(id)) {
        const i = this.selectArr.indexOf(id)
        this.selectArr.splice(i, 1)
      } else {
        this.selectArr.push(id)
      }
    },
    changeOrder() {
      this.orderBy === 0 ? this.orderBy = 1 : this.orderBy = 0
      /* this.memberList = this.memberList.sort((a, b) => {
        return this.isAsc ? a.contribution - b.contribution : b.contribution - a.contribution
      })*/
      this.memberList = []
      this.onLoad()
    },
    moveOutMember() {
      if (this.selectArr.length > 0) {
        const removeVipId = this.selectArr.join(',')
        this.remove(removeVipId)
      } else {
        Toast('请勾选需要移除的会员')
      }

      /* this.memberList = this.memberList.filter(item => {
        return !this.selectArr.includes(item.id)
      })*/
    },
    async getGuildVip(orderBy) {
      const res = await getGuildVip({
        orderBy,
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
        } else {
          this.pageNum += 1
        }
      }
    },
    async getGuildPresidentInfo() {
      const res = await getGuildVip({
        vipRoles: '1'
      })
      if (res.result === '0') {
        this.presidentInfo = res.data.list[0]
      }
    },
    async remove(removeVipId) {
      const res = await remove({
        removeVipId
      })
      if (res.result === '0') {
        Toast('移除成功')
        this.pageNum = 1
        this.isFinished = false
        this.memberList = []
      }
    },
    onLoad() {
      this.getGuildVip(this.orderBy)
    },
    onRefresh() {
      // 清空列表数据
      this.isFinished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.pageNum = 1
      this.getGuildPresidentInfo()
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

  .m_m_top_1 {
    width: 100%;
    height: 51px;
    background-color: #F3F3F3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;

    .list_rank {
      display: flex;

      .list_rank_text {
        margin-right: 8px;
        font-size: 15px;
        color: #353535;
        line-height: 21px;
      }
      .list_rank_icon {
        position: relative;
        width: 20px;
        .ig-list_rank_asc {
          position: absolute;
          top: 3px;
          left: 50%;
          transform: translateX(-50%) rotate(-45deg);
          border-top: 4px solid #BCBEC1;
          border-right: 4px solid #BCBEC1;
          border-bottom: 4px solid transparent;
          border-left: 4px solid transparent;
        }
        .ig-list_rank_desc {
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%) rotate(135deg);
          border-top: 4px solid #1452F5;
          border-right: 4px solid #1452F5;
          border-bottom: 4px solid transparent;
          border-left: 4px solid transparent;
        }
      }

      .is_asc {
        transform: rotateZ(180deg);
      }
    }
    .move_out {
      width: 56px;
      height: 21px;
      line-height: 21px;
      text-align: center;
      background: #1452F5;
      border-radius: 5px;
      font-size: 12px;
      color: #FFFFFF;
    }
  }

  .m_m_content {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;

    .m_m_self {
      width: 100%;
      padding: 15px 0;
      border-bottom: 1px solid #f8f8f8;
    }
  }

  .item_wrap {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;

    .ig-item_select {
      width: 8px;
      height: 8px;
      margin-right: 12px;
      border-radius: 8px;
      border: 1px solid #999999;
    }

    .ig-position {
      width: 8px;
      height: 8px;
      margin-right: 12px;
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
      width: 80px;
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

}
</style>
