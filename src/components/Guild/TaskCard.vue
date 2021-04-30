<template>
  <div id="coin-task_card_wrap" class="card_common ig_card_common_w">
    <div class="coin-task_card_top">
      <span class="coin-task_card_title under_line_title f17">{{ title }}</span>
    </div>
    <div class="coin-task_card_content">
      <div class="coin-task_item" v-for="item in taskData">
        <svg-icon
            :icon-class="taskIcon"
            class="coin-task_item_icon "
        ></svg-icon>
        <div class="coin-task_item_desc">
          <p class="coin-task_item_title">
            {{ item.taskTitle }}
            <span
                v-show="item.frequencyType !== 3"
            >({{ item.nowTimes }}/{{ item.frequencyTimes }})</span
            >
          </p>
          <p class="coin-task_item_reward">
            <span v-if="item.contribution != 0">贡献值+{{ item.contribution }}</span>
            <span v-if="item.gold != 0">,金币+{{ item.gold }}</span>
            <span v-if="item.other != ''">,{{ item.other }}</span>
          </p>
        </div>
        <van-button class="coin-task_item_complete" :disabled="item.isComplete" @click="toTask(item.taskType)">{{item.isComplete ? '已完成' : '去完成'}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'TaskCard',
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    taskIcon: {
      type: String,
      default() {
        return 'contribution'
      }
    },
    taskData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    vipRole() {
      return this.$store.state.app.userInfo.vipRole
    }
  },
  methods: {
    toTask(taskType) {
      switch (taskType) {
        case 11:
          if (this.vipRole != 4) {
            this.$router.push({
              name: 'Invitation'
            })
          } else {
            Toast('请先加入公会')
          }
          break
        case 8:
          this.$store.dispatch('app/setShowPublishWrap', true)
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#coin-task_card_wrap {
  .coin-task_card_top {
    text-align: left;
  }
  .coin-task_card_content {
    .coin-task_item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 12px;

      .coin-task_item_icon {
        margin-right: 12px;
        font-size: 35px;
      }
      .coin-task_item_desc {
        flex: 1;
        text-align: left;

        .coin-task_item_title {
          margin-bottom: 6px;
          font-size: 16px;
          line-height: 18px;
          color: #222222;
        }

        .coin-task_item_reward {
          height: 15px;
          font-size: 14px;
          line-height: 15px;
          color: #999999;
        }
      }
      .coin-task_item_complete {
        width: 58px;
        height: 21px;
        font-size: 13px;
        line-height: 21px;
        color: #1452f5;
        text-align: center;
        border: 1px solid #1452f5;
        border-radius: 10px;
        padding: 0!important;
      }
    }
    .coin-task_item:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
