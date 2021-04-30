<template>
  <div id="publish_article_wrap">
    <div class="p_a_title">
      <van-field
        class="p_a_title_input"
        v-model="form.title"
        placeholder="请输入标题(5～30个字)"
        clearable
        maxlength="30"
      />
    </div>
    <div class="p_a_rich">
      <quill-editor
        class="p_a_rich_content"
        v-model="form.articleBody"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      >
      </quill-editor>
      <input
        type="file"
        @change="change"
        id="upload"
        accept="image/PNG, image/JPG, image/JPEG, image/BMP, image/TIFF, image/PNM, image/WebP"
        style="display: none"
      />
    </div>
    <div class="p_a_upload-cover">
      <van-image
          class="p_a_cover"
          :src="form.image"
          fit="cover"
          v-show="showImage"
      />
      <svg-icon
          icon-class="publish"
          class="publish_icon"
          v-show="!showImage"
      ></svg-icon>
      <p class="publish_p" v-show="!showImage">上传封面图</p>
      <input
          type="file"
          class="upload_file"
          name="files"
          id="file"
          @change="selectImage"
      />
    </div>
    <van-button
class="p_a_btn"
:disabled="disabled"
@click="addArticle"
      >发布</van-button
    >
  </div>
</template>

<script>
// 工具栏配置
const toolbarOptions1 = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  // ['blockquote', 'code-block'], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  // [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ['clean'], // 清除文本格式
  ['link', 'image', 'video'] // 链接、图片、视频
]

// 工具栏配置
const toolbarOptions = [
  ['image'] // 链接、图片、视频
]

import { Toast } from 'vant'
import { uploadFile } from '@/api/upload'
import { addArticle } from '@/api/publish'
import { Quill } from 'vue-quill-editor'
import { ImageExtend } from 'quill-image-extend-module'
import { imgPreview } from '../../utils/img'
Quill.register('modules/ImageExtend', ImageExtend)
export default {
  name: 'PublishArticle',
  components: {},
  data() {
    return {
      showImage: false,
      formData: null,
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true, // 可选参数 是否显示上传进度和提示语
            name: 'img', // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: uploadFile, // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'xxx.com'}}
            // 则 return res.data.url
            response: (res) => {
              console.log(res)
              return res.data.url
            },
            headers: (xhr) => {}, // 可选参数 设置请求头部
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 自定义网络错误触发的事件
            change: (xhr, formData) => {} // 可选参数 选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            container: toolbarOptions, // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('#upload').click() // 劫持原来的图片点击按钮事件
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      form: {
        title: '',
        image: '',
        articleBody: '',
        isThrow: true
      },
      disabled: false
    }
  },
  watch: {
    test() {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const formData = new FormData()
      this.formData = formData

      document.querySelector('.p_a_rich').addEventListener('click', () => {
        setTimeout(() => {
          document.querySelector('#publish_article_wrap').scrollTop = 2000
        }, 500)
      })
    },
    async selectImage(e) {
      const file = e.target.files[0]
      imgPreview(file, this.updataImg)
    },
    async updataImg(file) {
      this.formData.set('files', file)
      // base64图片
      /*  const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = function() {
        _this.form.image = this.result
        _this.showImage = true
      }*/
      const res = await uploadFile(this.formData)
      if (res.result === '0') {
        this.form.image = res.data[0].url
        this.showImage = true
        // 重置input的value
        document.querySelector('#file').value = ''
      }
    },

    change(e) {
      const file = e.target.files[0]
      imgPreview(file, this.uploadImgData)
    },

    async uploadImgData(file) {
      const formData = new FormData()
      formData.append('files', file)
      const res = await uploadFile(formData)
      const quill = this.$refs.myQuillEditor.quill
      if (res.result === '0') {
        // const formdata = _.extend({}, this.formdata)
        const length = quill.getSelection() ? quill.getSelection().index : 0 // 光标位置
        // 插入图片  图片地址
        quill.insertEmbed(length, 'image', res.data[0].url)
        // 重置input的value
        document.querySelector('#upload').value = ''
        // 调整光标到最后
        quill.setSelection(length + 1) // 光标后移一位
        if (res.data[0].audit !== 1) {
          this.form.isThrow = false
        }
      }
    },
    async addArticle() {
      if (this.form.image === '') {
        Toast.fail({
          message: '请上传文章封面图'
        })
        return
      }
      if (this.form.title.length < 5) {
        Toast.fail({
          message: '文章标题必须大于5个字'
        })
        return
      }
      if (this.form.title.length > 1000) {
        Toast.fail({
          message: '文章标题必须小于1000字'
        })
        return
      }
      if (this.form.articleBody.length === 0) {
        Toast.fail({
          message: '请输入文章内容'
        })
        return
      }
      this.disabled = true
      const res = await addArticle(this.form)
      if (res.result === '0') {
        Toast.success({
          forbidClick: true,
          message: res.data.msg
        })
        setTimeout(() => {
          this.$router.back()
        }, 1000)
      } else {
        this.disabled = true
      }
    },
    onEditorBlur(e) {},
    onEditorFocus(e) {},
    onEditorReady(e) {}
  }
}
</script>

<style lang="scss" scoped>
#publish_article_wrap {
  width: 100%;
  height: 100%;
  padding: 15px 15px 0;
  overflow: auto;
  background-color: #fff;
  box-sizing: border-box;

  .p_a_upload-cover {
    position: relative;
    width: 100%;
    height: 135px;
    margin: 0 auto 120px;
    overflow: hidden;
    border: 1px solid rgba(151,151,151,.3);
    border-radius: 5px;

    .p_a_cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .publish_icon {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      font-size: 54px;
      color: #979797;
    }
    .publish_p {
      position: absolute;
      bottom: 20px;
      left: 50%;
      width: 100px;
      height: 21px;
      margin-left: -50px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 15px;
      font-weight: 400;
      line-height: 21px;
      color: #1452f5;
      text-align: center;
    }
    .upload_file {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  .p_a_title {
    width: 100%;
    margin-bottom: 12px;

    .p_a_title_input {
      padding: 0 6px 6px;
      font-family: PingFangSC-Semibold, PingFang SC;

      font-size: 17px;
      font-weight: 600;
      font-weight: bold;
      line-height: 24px;
      color: #999999;

      color: #999999;
      border-bottom: 1px solid rgba(151,151,151,.3);
    }
  }

  .p_a_rich {
    width: 100%;

    /deep/.ql-container {
      min-height: 240px;
      font-family: PingFangSC-Regular, PingFang SC;

      font-size: 16px;
      font-weight: 400;
      line-height: 23px;
      color: #222222;
    }
    /deep/.quill-editor {
      position: relative;

      .ql-toolbar.ql-snow {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
        width: 100%;
      }

      .ql-container.ql-snow {
        padding-bottom: 50px;
      }

      .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-top: 1px solid #ccc;
      }
      .ql-toolbar.ql-snow,.ql-container.ql-snow {
        border: none!important;
      }
    }
  }

  .p_a_btn {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 30px);
    height: 47px;
    font-size: 18px;
    line-height: 47px;
    color: #fff;
    text-align: center;
    background-color: #1452f5;
    border-radius: 24px;
  }
}
</style>
