<template>
  <div id="input_guild_info_wrap">
    <van-field
        class="input"
        v-model="guildInfo"
        type="textarea"
        maxlength="100"
        show-word-limit
        rows="10"
        :rules="[{ validator: validator, message: '已达到最大字数限制' }]"
        placeholder="请输入"
    />
    <div class="save" @click="save">保存</div>
  </div>
</template>

<script>
export default {
  name: 'InputGuildIntroduction',
  data() {
    return {
      guildInfo: ''
    }
  },
  watch: {
    test() {
    }
  },
  mounted() {
    this.guildInfo = window.sessionStorage.getItem('guildInfo')
  },
  methods: {
    validator(val) {
      return val.length > 100
    },
    save() {
      const guildInfo = this.guildInfo
      window.sessionStorage.setItem('guildInfo', guildInfo)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
#input_guild_info_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #F3F3F3;

  .input {
    width: calc(100% - 30px);
    margin: 10px auto;
    padding: 8px 10px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 5px;
    border: 1px solid #1452F5;
    font-size: 16px;
  }

  .save {
    position: absolute;
    bottom: 54px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    height: 47px;
    line-height: 47px;
    text-align: center;
    color: #fff;
    border-radius: 24px;
    font-size: 18px;
    background-color: #1452F5;
  }
}
</style>
