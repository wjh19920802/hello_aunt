<template>
  <div id="player_wrap" class="ig-player_wrap" v-show="showPlayer">
    <div id="J_prismPlayer"></div>
    <svg-icon icon-class="close" class="close" @click="closePlayer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Player',
  props: ['showPlayer'],
  data() {
    return {
      player: null,
      isShowPlayer: false
    }
  },
  watch: {
    playUrl(val) {
      this.player.loadByUrl(val, 10)
    }
  },
  computed: {
    ...mapGetters({
      playUrl: 'playUrl'
    })
  },
  mounted() {
    if (this.$store.state.player.showPlayer) {
      this.player.pause()
      this.$store.dispatch('player/ClosePlayer', false)
    }
    // this.player = document.getElementById('myVideo')
    const _this = this
    this.player = new Aliplayer(
      {
        id: 'J_prismPlayer',
        width: '100%',
        height: '100%',
        preload: true,
        autoplay: true,
        // 支持播放地址播放,此播放优先级最高
        source: ''
      },
      function(player) {
        console.log('播放器创建好了。')
      }
    )
  },
  methods: {
    closePlayer() {
      this.player.pause()
      this.$store.dispatch('player/ClosePlayer', false)
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
</style>
