<template>
  <div id="player_wrap" class="ig-player_wrap">
    <div id="J_prismPlayer"></div>
    <svg-icon icon-class="close" class="close" @click="closePlayer" />
  </div>
</template>

<script>
export default {
  name: 'Video',
  data() {
    return {
      player: null,
      playUrl: ''
    }
  },
  created() {
    this.playUrl = this.$route.params.playUrl
  },
  mounted() {
    const _this = this
    this.player = new Aliplayer(
      {
        id: 'J_prismPlayer',
        width: '100%',
        height: '100%',
        preload: true,
        autoplay: true,
        // 支持播放地址播放,此播放优先级最高
        source: _this.playUrl
      },
      function(player) {
        console.log('播放器创建好了。')
      }
    )
    _this.player.on('completeSeek', e => {
      console.log(e)
      alert(1)
    })
  },
  methods: {
    closePlayer() {
      this.player.pause()
    }
  }
}
</script>

<style lang="scss" scoped>
#player_wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  margin: auto auto;
  background-color: #000;

  .close {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 50px;
    color: #fff;
  }
}
@media screen and (min-width: 769px) {
  .ig-player_wrap {
    width: 750px !important;
    margin: 0 auto !important;
  }
}

/deep/.prism-big-play-btn {
  position: absolute;
  top: 50%!important;
  left: 50%!important;
  transform: translate(-50%,-50%);
}
</style>
