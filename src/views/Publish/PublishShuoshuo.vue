<template>
  <div id="publish_shuoshuo_wrap">
    <van-field
      v-model="title"
      rows="2"
      autosize
      type="textarea"
      maxlength="1000"
      placeholder="请输入内容"
      show-word-limit
    />
    <van-uploader
      class="upload ig-upload"
      v-model="fileList"
      image-fit="cover"
      multiple
      :before-read="BeforeRead"
      :after-read="afterRead"
      :max-count="maxCount"
      accept="image/*"
      @delete="deleteImg"
    />
    <van-button
class="publish_btn"
:disabled="disabled"
@click="addSay"
      >发布</van-button
    >
  </div>
</template>

<script>
import { imgPreviewImg } from '../../utils/img'
import { uploadFile } from '@/api/upload'
import { addSay } from '@/api/publish'
import { Toast } from 'vant'
export default {
  name: 'PublishShuoshuo',
  components: {},
  data() {
    return {
      title: '',
      fileList: [],
      maxCount: 9,
      disabled: false
    }
  },
  watch: {
    fileList(val) {}
  },
  mounted() {},
  methods: {
    deleteImg(e) {
      console.log(e)
    },
    afterRead(file, detail) {
      console.log('detail', detail)
    },
    async BeforeRead(file) {
      console.log('压缩前===========>>>>', file) // 4M

      if (file.constructor == Array) {
        const filesArr = []
        for (let i = 0; i < file.length; i++) {
          const img = await imgPreviewImg(file[i])
          filesArr.push(img)
        }
        console.log(filesArr)
        return filesArr
      } else {
        // const files = await imgPreviewImg(file)
        // console.log(files)
        // return files
      }
    },

    async addSay() {
      if (this.title.length < 5) {
        Toast.fail({
          message: '说说内容必须大于5个字'
        })
        return
      }
      if (this.title.length > 1000) {
        Toast.fail({
          message: '说说内容必须小于1000字'
        })
        return
      }
      this.disabled = true
      if (this.fileList.length > 0) {
        const formData = new FormData()
        // this.fileList.forEach(item => {
        //   console.log(item.file);
        // })
        for (let i = 0; i < this.fileList.length; i++) {
          // let file = await imgPreviewImg(this.fileList[i].file);
          console.log(this.fileList[i].file)
          formData.append('files', this.fileList[i].file)
        }
        const res = await uploadFile(formData)
        if (res.result === '0') {
          const isThrow = res.data.every(item => {
            return item.audit === 1
          })
          const imagesList = res.data.map(item => {
            return item.url
          })
          const images = imagesList.join(',')
          this.publish({
            title: this.title,
            images,
            isThrow
          })
        } else {
          this.disabled = false
        }
      } else {
        this.publish({ title: this.title, isThrow: true })
      }
    },

    async publish({ title, images, isThrow }) {
      const res2 = await addSay({
        title,
        images,
        isThrow
      })
      if (res2.result === '0') {
        Toast.success({
          duration: 1000,
          forbidClick: true,
          message: res2.data.msg
        })
        setTimeout(() => {
          this.$router.back()
        }, 1000)
      } else {
        this.disabled = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#publish_shuoshuo_wrap {
  width: 100%;
  height: 100%;
  padding-bottom: 105px;
  overflow-y: auto;
  text-align: left;
  background-color: #fff;
  box-sizing: border-box;

  .upload {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;

    /deep/.van-uploader__preview {
      width: 105px;
      height: 105px;
    }

    /deep/.van-uploader__mask {
      width: 80px;
      height: 80px;
    }
  }
  @media screen and (min-width: 768px) {
    .ig-upload {
      width: 540px;
    }
  }

  .publish_btn {
    position: absolute;
    bottom: 54px;
    left: 20px;
    width: calc(100% - 40px);
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
