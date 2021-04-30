<template>
  <div id="material">
    <div class="material_top">
      <p>进行中</p>
      <p>请提交资料，用于系统审核</p>
    </div>
    <div class="material_content">
      <div class="m_c_title">
        MODEL Y震撼上市预热活动吧啦吧啦吧,Y震撼上市预热活动吧啦吧啦吧
      </div>
      <div class="m_c_line"></div>
      <div class="m_c_audit">
        <p class="m_c_audit_title">审核资料</p>
        <van-field
            class="m_c_audit_textarea"
            v-model="auditMaterial"
            type="textarea"
            placeholder="请在此粘贴审核资料，如发布成功后的链接等"
        />
      </div>
      <div class="m_c_screenshot">
        <p class="m_c_screenshot_title">上传相关截图</p>
        <van-uploader v-model="fileList" multiple max-count="9" />
      </div>
      <div class="m_c_btn">提交</div>
    </div>
  </div>
</template>

<script>
import { test } from '@/api/user'
export default {
  name: 'Material',
  components: {},
  data() {
    return {
      auditMaterial: '',
      fileList: []
    }
  },
  watch: {
    test() {}
  },
  mounted() {
    test()
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#material {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  text-align: left;

  .material_top {
    width: 100%;
    height: 102px;
    padding-top: 15px;
    background: linear-gradient(90deg, #ed17aa 0%, #1452f5 100%);
    box-sizing: border-box;
    text-align: center;

    p:first-of-type {
      margin-bottom: 3px;
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
      color: #ffffff;
    }

    p:last-of-type {
      font-size: 13px;
      line-height: 19px;
      color: #ffffff;
    }
  }

  .material_content {
    width: 100%;
    min-height: calc(100% - 72px);
    padding: 22px 15px;
    margin-top: -30px;
    background-color: #fff;
    border-radius: 12px 12px 0 0;
    box-sizing: border-box;

    .m_c_title {
      margin-bottom: 15px;
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
      color: #222222;
    }

    .m_c_audit {
      width: 100%;
      margin-top: 15px;
      margin-bottom: 15px;

      .m_c_audit_title {
        font-size: 14px;
        font-weight: bold;
        color: #222222;
        line-height: 20px;
        margin-bottom: 9px;
      }

      .m_c_audit_textarea {
        height: 105px;
        border: 1px solid #C5C4C4;
        font-size: 12px;
        color: #999999;
      }
    }

    .m_c_screenshot {
      width: 100%;
      margin-bottom: 85px;

      .m_c_screenshot_title {
        font-size: 14px;
        font-weight: bold;
        color: #222222;
        line-height: 20px;
        margin-bottom: 8px;
      }
    }

    .m_c_btn {
      width: calc(100% - 40px);
      height: 47px;
      line-height: 47px;
      text-align: center;
      margin: 0 auto;
      border-radius: 24px;
      background-color: #1452f5;
      font-size: 20px;
      color: #fff;
    }

  }

  .t_line {
    width: 100%;
    height: 1px;
    background-color: rgba(199, 199, 199, .3);
  }
}
</style>
