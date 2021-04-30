<template>
  <div id="article_wrap" :class="{ 'is-show-comment': isShowComment }">
    <div class="article_title f18">{{ aticleInfo.worksTitle }}</div>
    <div class="article_author" @click="toUserCenter">
      <VanImage
        class="article_author_avator"
        :src="aticleInfo.vipPic"
        fit="cover"
      />
      <div class="article_author_n_t">
        <div class="article_author_name f16">{{ aticleInfo.vipName }}</div>
        <div class="article_publish_time f14">
          {{  getTime(aticleInfo.createTime) }}
        </div>
      </div>
    </div>
    <div class="article_content f16" v-html="aticleInfo.worksContent"></div>
<!--    <PZZ />-->
  </div>
</template>

<script>
import PZZ from '@/components/PZZ/Pzz'
import { worksDetail, detail } from 'api/article'
import { getDateDiff } from '../../utils/timeuitl'
export default {
  name: 'Article',
  components: {
    PZZ
  },
  data() {
    return {
      isShowComment: false,
      aticleInfo: {
        userName: '',
        articleTitle:
          '',
        imgUrl: '',
        pulishTime: '',
        content:
          ''
      }
    }
  },
  computed: {

  },
  mounted() {
    this.worksDetail()
    console.log(this.$route.params)
  },
  methods: {
    getTime: function(time) {
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
          /*  this.aticleInfo.userName = res.data.vipName // 作者
            this.aticleInfo.articleTitle = res.data.worksTitle // title
            this.aticleInfo.pulishTime = res.data.createTime // 发布时间
            this.aticleInfo.imgUrl = res.data.vipPic // 头像
            this.aticleInfo.content = res.data.worksContent // 内容*/
          this.aticleInfo = res.data
        }
      } else {
        const res = await worksDetail({
          workId: this.$route.params.id
        })
        if (res.result === '0') {
          /*  this.aticleInfo.userName = res.data.vipName // 作者
            this.aticleInfo.articleTitle = res.data.worksTitle // title
            this.aticleInfo.pulishTime = res.data.createTime // 发布时间
            this.aticleInfo.imgUrl = res.data.vipPic // 头像
            this.aticleInfo.content = res.data.worksContent // 内容*/
          this.aticleInfo = res.data
        }
      }
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
#article_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px 15px 60px;
  overflow-y: auto;
  background-color: #fff;
  box-sizing: border-box;

  .article_title {
    margin-bottom: 17px;
    font-weight: bold;
    line-height: 25px;
    color: #222222;
    text-align: left;
  }
  .article_author {
    display: flex;
    margin-bottom: 25px;
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

  .article_content {
    line-height: 25px;
    color: #222222;
    text-align: left;

    /deep/img {
      width: 100%;
    }
  }
}
</style>
