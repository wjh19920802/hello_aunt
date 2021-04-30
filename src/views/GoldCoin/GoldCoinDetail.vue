<template>
  <div id="gold_coin_detail_wrap" class="ig-wrap">
    <div class="detail_list">
      <div class="detail_top">
        <div class="detail_top_withdraw_count" v-if="active == 1">
          <p>提现金币:</p>
          <p>
            {{ painAddUp }} =
            <span class="detail_top_withdraw_rmb">¥ {{ painAddUp / 100 }}</span>
          </p>
        </div>
        <div class="detail_top_withdraw_count" v-if="active == 0">
          <span>{{ type == 1 ? "获得金币" : "贡献值" }}:</span>
          <span>{{ getAddUp }}</span>
        </div>
        <div @click="showPicker" class="show_picker">
          <span class="pick_year_month">{{ value }}</span>
          <span class="right_arrow"></span>
        </div>
        <van-popup v-model="isShowPicker" round position="bottom">
          <van-picker
            show-toolbar
            title="选择年月"
            :columns="columns"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <!--  金币明细    -->
      <van-tabs
        v-model="active"
        v-if="type == 1"
        background="#fff"
        color="#1452F5"
        sticky
        title-active-color="#1452F5"
        @change="changeTab"
        @scroll="scroll"
      >
        <van-tab title="获得明细">
          <van-list
            v-model="loading"
            :finished="isFinished"
            finished-text="已经到底啦～"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in getList" :key="index">
              <div
                class="get_item_wrap"
                :class="{
                  not_now_guild: type != 1 && item.isDisable == '1',
                }"
              >
                <div class="item_left">
                  <p class="item_title">{{ item.name }}</p>
                  <p class="item_createTime">{{ item.createTime }}</p>
                </div>
                <div class="item_right">
                  <p>+{{ item.amount }}</p>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
        <van-tab title="提现明细">
          <van-list
            v-model="loading"
            :finished="isFinished"
            finished-text="已经到底啦～"
            @load="onLoad"
          >
            <van-cell v-for="(item, index) in withdrawList" :key="index">
              <div class="withdraw_item_wrap">
                <div class="item_top">
                  <p class="item_title">
                    <span>{{ item.name }}</span>
                    <span>{{ item.status | formatStatus }}</span>
                  </p>
                  <p>-{{ item.amount }}</p>
                </div>
                <div class="item_bottom">
                  <p>{{ item.createTime }}</p>
                  <p>¥{{ item.rmb }}</p>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
      <!--  我的贡献    -->
      <van-list
        v-else
        v-model="loading"
        :finished="isFinishedContribution"
        finished-text="已经到底啦～"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in contributionList" :key="index">
          <div
            class="get_item_wrap"
            :class="{ not_now_guild: item.isDisable == '1' }"
          >
            <!-- <div class="item_top">
              <p class="item_title">
                <span>{{ item.name }}</span>
&lt;!&ndash;                <span>{{ item.status | formatStatus }}</span>&ndash;&gt;
              </p>
              <p>-{{ item.contributionEarn }}</p>
            </div>
            <div class="item_bottom">
              <p>{{ item.createTime }}</p>
            </div>-->
            <div class="item_left">
              <p class="item_title">{{ item.name }}</p>
              <p class="item_createTime">{{ item.createTime }}</p>
            </div>
            <div class="item_right">
              <p v-if="item.method == '0'">+{{ item.amount }}</p>
              <p v-else>-{{ item.amount }}</p>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import { formateDate } from '@/utils/timeuitl'
import { contributionDetailPage, goldCoinDetail } from '@/api/user'
export default {
  name: 'GoldCoinDetail',
  components: {},
  data() {
    return {
      columns: [
        {
          values: ['2019', '2020', '2021'],
          defaultIndex: 2
        },
        // 第二列
        {
          values: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12'
          ],
          defaultIndex: 0
        }
      ],
      isShowPicker: false,
      yearMonth: '',
      active: 0,
      getList: [],
      withdrawList: [],
      contributionList: [],
      loading: false,
      isFinished: false,
      isFinishedContribution: false,
      scrollObj: {
        0: 0,
        1: 0
      },
      form: {
        pageNum: 1,
        pageSize: 20
      },
      formContribution: {
        pageNum: 1,
        pageSize: 20
      },
      startTime: '',
      endTime: '',
      isFirstChangeTab: true,
      getAddUp: 0,
      painAddUp: 0
    }
  },
  watch: {
    withdrawList(v) {
      this.painAddUp = v.reduce((total, item) => {
        return total + item.amount
      }, 0)
    },
    getList(v) {
      this.getAddUp = v.reduce((total, item) => {
        return total + item.amount
      }, 0)
    },
    contributionList(v) {
      this.getAddUp = v.reduce((total, item) => {
        if (item.method == '0') {
          return total + item.amount
        } else {
          return total - item.amount
        }
      }, 0)
    }
  },
  computed: {
    value: {
      set(val) {
        this.yearMonth = val
      },
      get() {
        return this.yearMonth
          ? this.yearMonth
          : new Date().toJSON().split('-')[0] +
              '-' +
              new Date().toJSON().split('-')[1]
      }
    },
    type() {
      return this.$route.params.type
    },
    guildInfo() {
      return this.$store.state.guild.guildInfo
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.type == 1) {
        document.title = '金币明细'
      } else {
        document.title = '我的贡献'
      }
      const ym = []
      ym[0] = new Date().getFullYear()
      ym[1] =
        new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : '0' + (new Date().getMonth() + 1)
      this.columns[1].values.forEach((item, index) => {
        if (item == ym[1]) {
          this.columns[1].defaultIndex = index
        }
      })
      const ymStr = ym.join('-')
      this.formatDate(ymStr)
    },
    showPicker() {
      this.isShowPicker = true
    },
    onConfirm(value) {
      this.isShowPicker = false
      this.value = value.join('-')
      this.formatDate(this.value)

      if (this.type == 1) {
        if (this.active == 0) {
          this.getList = []
        } else {
          this.withdrawList = []
        }
        this.goldCoinDetail()
      } else {
        this.contributionList = []
        this.contributionDetailPage()
      }
    },
    changeTab() {
      this.getList = []
      this.withdrawList = []
      this.goldCoinDetail()
      this.scrollTop()
    },
    scrollTop() {
      /* const scrollTop = parseFloat(
        getStyle(document.querySelector('.detail_top')).height
      )*/
      const scrollTop = this.scrollObj[this.active]
      this.$nextTick(() => {
        document.querySelector('.detail_list').scrollTop = scrollTop
      })
    },
    scroll(v) {
      const scrollTop = document.querySelector('.detail_list').scrollTop
      this.scrollObj[this.active] = scrollTop
    },
    async contributionDetailPage() {
      const data = Object.assign({}, this.formContribution, {
        startTime: this.startTime,
        endTime: this.endTime
      })
      const res = await contributionDetailPage(data)
      if (res.result === '0') {
        this.contributionList = this.contributionList.concat(res.data.records)
        if (res.data.records.length < this.formContribution.pageSize) {
          this.isFinishedContribution = true
        } else {
          this.isFinishedContribution = false
          this.formContribution.pageNum += 1
        }
      }
    },
    async goldCoinDetail() {
      const data = Object.assign({}, this.form, {
        startTime: this.startTime,
        endTime: this.endTime
      })
      if (this.active === 0) {
        data.method = 0
      } else {
        data.type = 7
      }
      const res = await goldCoinDetail(data)
      if (res.result === '0') {
        if (this.active === 0) {
          this.getList = this.getList.concat(res.data.records)
        } else {
          this.withdrawList = this.withdrawList.concat(res.data.records)
        }
        if (res.data.records.length < this.form.pageSize) {
          this.isFinished = true
        } else {
          this.isFinished = false
          this.from.pageNum += 1
        }
      }
    },
    onLoad() {
      if (this.type == 1) {
        this.goldCoinDetail()
      } else {
        this.contributionDetailPage()
      }
    },
    formatDate(value) {
      const monthFirstDate = new Date(new Date(value).setHours(0, 0, 0))
      monthFirstDate.setDate(1)
      const monthLastDate = new Date(new Date(value).setHours(23, 59, 59))
      monthLastDate.setMonth(monthLastDate.getMonth() + 1)
      monthLastDate.setDate(0)
      const monthFirstDateString = formateDate(
        monthFirstDate,
        'yyyy-MM-dd hh:mm:ss'
      )
      const monthLastDateString = formateDate(
        monthLastDate,
        'yyyy-MM-dd hh:mm:ss'
      )
      this.startTime = monthFirstDateString
      this.endTime = monthLastDateString
    }
  },
  filters: {
    formatStatus(val) {
      return val === 1 ? '已到账' : val === 2 ? '提现中' : '失败'
    }
  }
}
</script>

<style lang="scss" scoped>
#gold_coin_detail_wrap {
  width: 100%;
  height: 100%;

  /deep/.van-tabs__wrap {
    height: 60px;
  }
  /deep/.van-tabs__line {
    bottom: 20px;
  }

  .detail_list {
    width: 100%;
    height: 100%;
    overflow-y: auto;

    .detail_top {
      display: flex;
      width: 100%;
      height: 75px;
      padding: 15px;
      font-size: 17px;
      line-height: 24px;
      color: #000000;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;

      .detail_top_withdraw_count {
        text-align: left;

        .detail_top_withdraw_rmb {
          color: #02bb00;
        }
      }

      .show_picker {
        display: flex;
        align-items: center;

        .pick_year_month {
          color: #1452f5;
        }

        .right_arrow {
          @include right-arrow(#c5c4c4);
        }
      }
    }

    .get_item_wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .item_title {
          margin-bottom: 8px;
          font-size: 17px;
          line-height: 24px;
          color: #222222;
        }

        .item_createTime {
          font-size: 13px;
          line-height: 18px;
          color: #999999;
        }
      }

      .item_right {
        font-size: 17px;
        line-height: 24px;
        color: #222222;
      }
    }

    .not_now_guild {
      .item_title,
      .item_right {
        color: #999 !important;
      }
    }

    .item_top,
    .item_bottom {
      display: flex;
      justify-content: space-between;
    }

    .item_top {
      margin-bottom: 8px;
      font-size: 17px;
      line-height: 24px;
      color: #222222;

      .item_title {
        span:first-of-type {
          margin-right: 10px;
        }
        span:nth-of-type(2) {
          font-size: 15px;
          color: #999999;
        }
      }
    }

    .item_bottom {
      font-size: 13px;
      line-height: 18px;
      color: #999999;
    }
  }

  .van-list {
    .van-cell:after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 95%;
      height: 1px;
      background-color: #f3f3f3;
      transform: translateX(-50%);
    }
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
</style>
