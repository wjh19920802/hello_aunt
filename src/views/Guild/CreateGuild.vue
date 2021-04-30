<template>
  <div id="create_guild_wrap">
    <div class="c_g_top bg_linear-gradient"></div>
    <div class="c_g_content">
      <div class="c_g_upload_avator">
        <div class="c_g_upload">
          <van-uploader
            :after-read="afterRead"
            :disabled="disabled"
            accept="image/PNG, image/JPG, image/JPEG, image/BMP, image/TIFF, image/PNM, image/WebP"
          >
            <van-image
              class="c_g_avator"
              fit="cover"
              :src="!guildPic ? guildPosition : guildPic"
            ></van-image>
            <span v-if="showText">点击上传头像</span>
          </van-uploader>
        </div>
      </div>
      <!--      <div>
        <input type="file" multiple name="file" @change="change">
      </div>-->
      <div class="c_g_info">
        <div class="c_g_name c_g_d1" @click="toInputGuildName">
          <span class="c_g_s1">公会名称</span>
          <!--<van-field
            class="c_g_name_input"
            v-model="guildName"
            placeholder="请输入"
          />-->
          <div class="c_g_name_input">
            <span>{{ guildName ? guildName : "请输入" }}</span>
            <div class="c_g_arrow"></div>
          </div>
        </div>
        <div class="c_g_address c_g_d1" @click="showPopup">
          <span class="c_g_s1">公会地点</span>
          <div class="c_g_s2">
            {{ !guildArea ? "选择地点" : guildArea }}
            <div class="c_g_arrow"></div>
          </div>
        </div>
        <div
          class="c_g_desc c_g_d2"
          v-if="type == 1"
          @click="toGuildIntroduction"
        >
          <div class="c_g_d1">
            <span class="c_g_s1">公会介绍</span>
            <div class="c_g_arrow"></div>
          </div>
          <div class="c_g_textarea">
            {{ !guildInfo ? "填写公会介绍，让大家更了解你的公会" : guildInfo }}
          </div>
        </div>
        <div
          class="c_g_offline c_g_d1"
          v-if="type == 2"
          @click="!disabled ? (showOfflinePicker = true) : null"
        >
          <span class="c_g_s1">线下是否有团队</span>
          <!--<van-field
            class="c_g_name_input"
            v-model="guildName"
            placeholder="请输入"
          />-->
          <div class="c_g_name_input">
            <span>{{ offlinePickerValue }}</span>
            <div class="c_g_arrow"></div>
          </div>
        </div>
        <div
          class="c_g_group c_g_d1"
          v-if="offlinePickerValue == '是' && type == 2"
          @click="showGroupPicker = true"
        >
          <span class="c_g_s1">团队规模</span>
          <!--<van-field
            class="c_g_name_input"
            v-model="guildName"
            placeholder="请输入"
          />-->
          <div class="c_g_name_input">
            <span>{{ guildSize }}</span>
            <div class="c_g_arrow"></div>
          </div>
        </div>
      </div>
    </div>
    <van-button
class="c_g_btn"
:disabled="disabled"
@click="createGuild"
      >确定</van-button
    >
    <van-popup v-model="showCascader" round position="bottom">
      <van-picker
        show-toolbar
        title="地点"
        :columns="area"
        @cancel="showCascader = false"
        @confirm="confirmArea"
      />
    </van-popup>
    <van-popup v-model="showOfflinePicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="offlinePickerColumn"
        @cancel="showOfflinePicker = false"
        @confirm="onOfflinePickerConfirm"
      />
    </van-popup>
    <van-popup v-model="showGroupPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="groupPickerColumn"
        @cancel="showGroupPicker = false"
        @confirm="onGroupPickerConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import guildPosition from 'assets/imgs/guild_posiiton.png'
import { mapGetters } from 'vuex'
import { uploadFile } from 'api/upload'
import {
  createGuild,
  getGuildDetail,
  guildState,
  updateGuild
} from 'api/guild'
import { Toast } from 'vant'
import { area } from '@/utils/area'
import { imgPreview } from '../../utils/img'
import { getInfo } from 'api/app'
export default {
  name: 'CreateGuild',
  components: {},
  data() {
    return {
      // type: 1, // 1 扫团长码创建公会   2 直接创建公会
      guildData: {},
      guildPic: '',
      guildPosition: guildPosition,
      showText: true,
      guildName: '',
      showCascader: false,
      area: area,
      cascaderValue: '',
      addressValue: [],
      guildArea: '',
      guildInfo: '',
      offlinePickerValue: '是',
      showOfflinePicker: false,
      offlinePickerColumn: ['是', '否'],
      guildSize: '<10人',
      showGroupPicker: false,
      groupPickerColumn: ['<10人', '10～30人', '31~50人', '51~100人', '>100人']
      // hasGuild: false
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      userInfo: 'userInfo'
    }),
    disabled() {
      if (
        this.$route.query.type == 'edit' ||
        (this.userInfo.vipRole == 4 &&
          (Object.keys(this.guildData).length === 0 ||
            this.guildData.guildStatus == 2))
      ) {
        return false
      } else {
        return true
      }
    },
    type() {
      if (this.$route.query.sceneCode || this.$route.query.type == 'edit' || this.guildData.guildInfo) {
        return 1
      } else {
        return 2
      }
    }
  },
  created() {
    if (this.$route.query.type == 'edit') {
      document.title = '编辑公会'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.guildState()
    },
    setParams() {
      if (this.$route.query.type == 'edit') {
        document.title = '编辑公会'
      }
      if (window.sessionStorage.getItem('guildName')) {
        this.guildName = window.sessionStorage.getItem('guildName')
      }
      if (window.sessionStorage.getItem('guildInfo')) {
        this.guildInfo = window.sessionStorage.getItem('guildInfo')
      }
    },
    showPopup() {
      if (this.disabled) return
      this.showCascader = true
    },
    toInputGuildName() {
      if (this.disabled) return
      window.sessionStorage.setItem('guildName', this.guildName)
      this.$router.push({
        name: 'InputGuildName'
      })
    },
    toGuildIntroduction() {
      if (this.disabled) return
      window.sessionStorage.setItem('guildInfo', this.guildInfo)
      this.$router.push({
        name: 'InputGuildIntroduction'
      })
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      imgPreview(file.file, this.updataImg)
    },
    async updataImg(file) {
      console.log(file)
      // 此时可以自行将文件上传至服务器
      const formData = new FormData()
      formData.append('files', file)
      const res = await uploadFile(formData)
      if (res.result === '0') {
        this.showText = false
        this.guildPic = res.data[0].url
      }
      console.log(res)
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.showCascader = false
      console.log(selectedOptions)
      this.addressValue = selectedOptions
    },
    onOfflinePickerConfirm(value) {
      this.offlinePickerValue = value
      this.showOfflinePicker = false
    },
    onGroupPickerConfirm(value) {
      this.guildSize = value
      this.showGroupPicker = false
    },
    async createGuild() {
      const data = {
        guildPic: this.guildPic,
        guildName: this.guildName,
        guildProvince: this.guildArea.split(' ')[0],
        guildCity: this.guildArea.split(' ')[1],
        guildInfo: this.guildInfo,
        guildSize: this.guildSize
      }
      if (this.$route.query.sceneCode) {
        data.sceneCode = this.$route.query.sceneCode
      }
      if (this.guildPic === '') {
        Toast.fail('请上传公会头像')
        return
      }
      if (this.guildName === '') {
        Toast.fail('请填写公会名称')
        return
      }
      if (this.guildArea === '') {
        Toast.fail('请选择公会地点')
        return
      }
      if (this.$route.query.type === 'edit') {
        data.guildId = this.guildData.id
        const res = await updateGuild(data)
        if (res.result === '0') {
          Toast({
            message: '编辑成功',
            duration: 3000
          })
        }
      } else {
        const res = await createGuild(data)
        if (res.result === '0') {
          if (data.sceneCode) {
            Toast('创建成功')
          } else {
            Toast('请等待审核')
          }
          getInfo().then(res => {
            if (res === 'ok') {
              this.$router.replace({
                name: 'Guild'
              })
            }
          })
        }
      }
    },
    confirmArea(v) {
      console.log(v)
      this.showCascader = false
      this.guildArea = v[0] + ' ' + v[1]
    },
    async guildState() {
      const res = await guildState()
      console.log(res)
      if (res.result === '0') {
        if (res.data.length > 0) {
          let data = {}
          if (res.data.length > 1) {
            data = res.data.find(item => {
              return item.guildStatus === 1
            })
          } else if (res.data.length === 1) {
            data = res.data[0]
          }
          this.guildData = data
          this.guildPic = data.guildPic
          this.guildName = data.guildName
          this.guildArea = data.guildProvince + ' ' + data.guildCity
          this.offlinePickerValue = data.guildInfo ? '否' : '是'
          this.guildSize = data.guildSize
          this.guildInfo = data.guildInfo
        }
      }
    }
  },
  activated() {
    this.setParams()
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/') {
      window.sessionStorage.removeItem('guildName')
      window.sessionStorage.removeItem('guildInfo')
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('to', to)
    if (['InputGuildIntroduction', 'InputGuildName'].includes(to.name)) {
      const keepAlive = this.$store.state.app.keepAlive
      if (!keepAlive.includes('CreateGuild')) {
        keepAlive.push('CreateGuild')
        this.$store.dispatch('app/setKeepAlive', keepAlive)
      }
    } else {
      const keepAlive = this.$store.state.app.keepAlive
      keepAlive.remove('CreateGuild')
      window.localStorage.removeItem('guildName')
      window.localStorage.removeItem('guildInfo')
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
#create_guild_wrap {
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;

  .c_g_top {
    width: 100%;
    height: 105px;
  }

  .c_g_content {
    width: calc(100% - 20px);
    //min-height: 280px;
    padding: 20px;
    margin: -93px auto 173px;
    background-color: #fff;
    border-radius: 20px;
    box-sizing: border-box;

    .c_g_upload_avator {
      margin-bottom: 15px;

      .c_g_avator {
        width: 43px;
        height: 43px;
        margin: 0 auto 8px;
        border-radius: 50%;

        /deep/img {
          border-radius: 50%;
        }
      }

      .c_g_upload {
        font-size: 15px;
        line-height: 18px;
        color: #1452f5;
        text-align: center;

        /deep/.van-uploader__input-wrapper {
          display: flex;
          flex-direction: column;
        }
      }
    }

    .c_g_info {
      width: 100%;

      .c_g_d1 {
        position: relative;
        display: flex;
        width: 100%;
        height: 40px;
        padding: 10px 0;
        border-top: 1px solid rgba(199, 199, 199, .3);
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;

        .c_g_s1 {
          //width: 104px;
          font-size: 16px;
          line-height: 20px;
          color: #222222;
          text-align: left;
        }

        .c_g_s2 {
          font-size: 16px;
          line-height: 20px;
          color: #999999;
        }

        .c_g_name_input {
          font-size: 16px;
          line-height: 20px;
          color: #999999;
          text-align: right;

          /deep/.van-field__control {
            text-align: right;
          }
        }
      }

      .c_g_name {
        padding-top: 0 !important;
        border-top: none;
      }

      .c_g_d2 {
        position: relative;

        .c_g_d1 {
          padding-bottom: 5px;
          border-bottom: none;
        }

        .c_g_textarea {
          padding: 0;
          font-size: 15px;
          line-height: 16px;
          color: #999999;
          text-align: left;

          /deep/.van-field__control {
            font-size: 12px;
            line-height: 18px;
            color: #999999;
          }
        }
      }

      .c_g_arrow {
        @include right-arrow(#c5c4c4);
      }
    }
  }

  .c_g_btn {
    width: calc(100% - 40px);
    height: 47px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 47px;
    color: #ffffff;
    text-align: center;
    background-color: #1452f5;
    border-radius: 24px;
  }
}
</style>
