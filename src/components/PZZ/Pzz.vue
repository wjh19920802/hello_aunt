<template>
  <div id="pzz-footer" class="ig-pzz_footer">
    <div class="write_comment">写评论～</div>
    <div class="article_comment footer_i">
      <svg-icon class="article_icon" icon-class="message"></svg-icon>
      <span>0</span>
    </div>
    <div class="article_like footer_i">
      <svg-icon
        class="article_icon"
        :icon-class="1 == 2 ? 'like-2_active' : 'like-2'"
      ></svg-icon>
      <span>0</span>
    </div>
    <div class="article_forward footer_i">
      <svg-icon class="article_icon" icon-class="forward"></svg-icon>
      <span>转发</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pzz',
  components: {},
  data() {
    return {}
  },
  watch: {
    test() {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
#pzz-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 45px;
  padding: 8px 15px;
  margin: auto auto;
  background-color: #fff;
  box-shadow: 0 0 1px 0 #c5c4c4;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;

  .write_comment {
    width: 52%;
    height: 30px;
    padding: 0 6px;
    margin-right: 25px;
    line-height: 30px;
    color: #999999;
    text-align: left;
    background: #f2f2f2;
    border: 1px solid #c5c4c4;
    border-radius: 6px;
    box-sizing: border-box;
  }

  .footer_i {
    margin-right: 10px;

    .article_icon {
      display: inline;
      margin-right: 5px;
      font-size: 15px;
    }

    span {
      position: relative;
      top: -1px;
    }
  }

  .article_comment {
    margin-right: 13px;
  }

  .article_forward {
    margin-right: 0;
  }
}

@media screen and (min-width: 769px) {
  .ig-pzz_footer {
    width: 750px !important;
  }
}
</style>
