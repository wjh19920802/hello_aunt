<template>
  <div id="shuo_wrap">
    <div class="shuo_top">
      <div class="article_author" @click="toUserCenter">
        <VanImage
          class="article_author_avator"
          :src="aticleInfo.vipPic"
          fit="cover"
        />
        <div class="article_author_n_t">
          <div class="article_author_name f16">{{ aticleInfo.vipName }}</div>
          <div class="article_publish_time f14">
            {{ getTime(aticleInfo.createTime) }}
          </div>
        </div>
      </div>
      <div class="shuo_content">
        <div>{{ aticleInfo.worksContent }}</div>
      </div>
      <div class="shuo_imgs_list">
        <div
          class="shuo_img_wrap"
          :key="index"
          v-for="(item, index) in aticleInfo.imgs"
          @click="preview(index)"
        >
          <van-image class="shuo_img_item" fit="cover" :src="item" />
        </div>
      </div>
    </div>
    <!-- <div class="comments">
      <div class="comments_title">
        评论 300
      </div>
      <div class="comments_content">
        <div class="comments_item" v-for="(item, index) in comments" :key="index">
          <div class="comments_item_l">
            <VanImage
                class="comments_item_l_img"
                :src="item.avator"
                fit="cover"
            />
          </div>
          <div class="comments_item_r">
            <div class="comments_item_r_t">
              <svg-icon
                  class="comments_item_r_t_icon"
                  :icon-class="item.isLike == 1 ? 'like-2_active' : 'like-2' "
                  @click="toggleLike(index)"
              >

              </svg-icon>
              <p class="comments_item_r_t_author">{{item.author}}</p>
            </div>
            <div class="contents_item_content">{{item.content}}</div>
            <div class="comments_item_r_b" v-if="item.total > 0">
              <div class="comments_item_r_b_i" v-for="(his, index) in item.historys" :key="index">
                <span class="comments_item_s1">{{his.author}}</span>
                <span v-if="his.to" class="comments_item_s2">回复 <span class="comments_item_s1">@{{his.to}}</span></span>
                <span class="comments_item_s2"> : {{his.content}}</span>
              </div>
              <div class="comments_item_r_b_total" v-if="item.total > 2">共{{item.total}}条回复 ></div>
            </div>
            <div class="comments_item_r_time">
              {{item.time | formatTime}}
            </div>
          </div>
        </div>
      </div>
    </div> -->
<!--    <PZZ />-->
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import PZZ from '@/components/PZZ/Pzz'
import { worksDetail, detail } from 'api/article'
import { getDateDiff } from '../../utils/timeuitl'
export default {
  name: 'Shuoshuo',
  components: {
    PZZ
  },
  data() {
    return {
      aticleInfo: {},
      comments: [],
      previewList: []
    }
  },
  watch: {
    test() {}
  },
  mounted() {
    this.worksDetail()
  },
  methods: {
    getTime(time) {
      return getDateDiff(time)
    },
    async worksDetail() {
      this.isLoading = true
      const type = this.$route.query.type
      if (type === '1') {
        const res = await detail({
          workId: this.$route.params.id
        })
        if (res.result === '0') {
          this.aticleInfo = res.data
          this.aticleInfo.imgs = this.previewList =
              res.data.worksIconUrl && res.data.worksIconUrl.split(',')
        }
      } else {
        const res = await worksDetail({
          workId: this.$route.params.id
        })
        if (res.result === '0') {
          this.aticleInfo = res.data
          this.aticleInfo.imgs = this.previewList =
              res.data.worksIconUrl && res.data.worksIconUrl.split(',')
        }
      }
    },
    preview(index) {
      wx.previewImage({
        current: this.previewList[index],
        urls: this.previewList
      })
    },
    toggleLike(curIndex) {
      this.comments.map((item, index) => {
        if (index === curIndex) {
          item.isLike = item.isLike === 1 ? 2 : 1
        }
      })
    },
    toUserCenter() {
      this.$router.push({
        name: 'PersonalHomepage',
        query: {
          userId: this.aticleInfo.vipId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#shuo_wrap {
  width: 100%;
  height: 100%;
  padding-bottom: 45px;
  overflow-y: auto;
  box-sizing: border-box;

  .shuo_top {
    width: 100%;
    padding: 15px 11px 11px 15px;
    margin-bottom: 13px;
    background-color: #fff;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.05);
    box-sizing: border-box;

    .article_author {
      display: flex;
      margin-bottom: 18px;
      justify-content: flex-start;
      align-items: center;

      .article_author_avator {
        width: 35px;
        height: 35px;
        margin-right: 12px;
        overflow: hidden;
        border-radius: 50%;
      }

      .article_author_n_t {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        .article_author_name {
          font-weight: bold;
          line-height: 20px;
          color: #222222;
        }

        .article_publish_time {
          line-height: 16px;
          color: #999999;
        }
      }
    }

    .shuo_content {
      margin-bottom: 18px;
      font-size: 16px;
      line-height: 20px;
      color: #222222;
      text-align: left;
      white-space: pre-wrap;
      word-break: break-all;
    }

    .shuo_imgs_list {
      max-width: 100%;
      text-align: left;

      .shuo_img_wrap {
        display: inline-block;
        width: calc(100% / 3);
        padding: 0 5px 5px 0;
        box-sizing: border-box;

        .shuo_img_item {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 100%;

          /deep/img {
            position: absolute;
          }
        }
      }
    }

    @media screen and (min-width: 750px) {
      .shuo_imgs_list {
        max-width: 400px;
      }
    }
  }

  .comments {
    width: 100%;
    height: auto;
    background-color: #fff;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.05);

    .comments_title {
      width: 100%;
      height: 36px;
      padding-left: 15px;
      font-size: 12px;
      font-weight: bold;
      line-height: 36px;
      color: #222222;
      text-align: left;
      border-bottom: 1px solid #c5c4c4;
      box-sizing: border-box;
    }

    .comments_content {
      width: 100%;
      padding: 18px;
      text-align: left;
      box-sizing: border-box;

      .comments_item {
        display: flex;
        width: 100%;
        margin-bottom: 15px;

        .comments_item_l {
          width: 35px;
          height: 35px;
          margin-right: 12px;
        }

        .comments_item_r {
          flex: 1;

          .comments_item_r_t {
            margin-bottom: 3px;
            overflow: hidden;

            .comments_item_r_t_author {
              font-size: 14px;
              font-weight: bold;
              line-height: 18px;
              color: #222222;
            }

            .comments_item_r_t_icon {
              float: right;
              font-size: 16px;
            }
          }

          .contents_item_content {
            margin-bottom: 7px;
            font-size: 14px;
            line-height: 18px;
            color: #222222;
          }

          .comments_item_r_b {
            padding: 8px;
            margin-bottom: 6px;
            background: #f2f2f2;

            .comments_item_r_b_i {
              margin-bottom: 6px;

              .comments_item_s1 {
                font-size: 12px;
                line-height: 16px;
                color: #1452f5;
              }

              .comments_item_s2 {
                font-size: 12px;
                line-height: 16px;
                color: #999999;
              }
            }

            .comments_item_r_b_total {
              font-size: 12px;
              line-height: 16px;
              color: #1452f5;
            }
          }

          .comments_item_r_time {
            font-size: 12px;
            line-height: 14px;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
