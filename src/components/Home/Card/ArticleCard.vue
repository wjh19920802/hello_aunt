<template>
  <div id="article_card">
    <div class="article_cover">
      <VanImage class="cover_image" :src="cardData.worksIconUrl" fit="cover" />
    </div>
    <div class="article_content">
      <p class="content_overview f16">{{ cardData.worksTitle }}</p>
      <div class="content_publisher">
        <VanImage
          class="avator_image"
          :src="cardData.vipPic"
          fit="cover"
          @click.stop="toUserCenter"
        />
        <p class="publisher f14">{{ cardData.vipName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateDiff } from '../../../utils/timeuitl'
export default {
  name: 'ArticleCard',
  props: {
    cardData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    getTime: function(time) {
      return getDateDiff(time)
    },
    toUserCenter() {
      this.$router.push({
        name: 'PersonalHomepage',
        query: {
          userId: this.cardData.vipId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#article_card {
  width: 100%;
  height: 100px;
  @include flexbox .article_cover {
    width: 135px;
    height: 100px;

    .cover_image {
      width: 100%;
      height: 100%;
    }
  }
  .article_content {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    .content_overview {
      margin-bottom: 10px;
      font-weight: bold;
      line-height: 20px;
      color: #222222;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /*截取2行*/
      @include textoverflow(2);
    }
    .content_publisher {
      @include flexbox($jc: flex-start);
      .avator_image {
        width: 21px;
        height: 21px;
        margin-right: 8px;
        border-radius: 50%;

        /deep/.van-image__img {
          border-radius: 50%;
        }
      }
      .publisher {
        width: 100px;
        font-weight: bold;
        color: #999999;
        @include textoverflow();
      }
    }
  }
}
/deep/.van-skeleton__avatar {
  margin-top: 8px;
}
</style>
