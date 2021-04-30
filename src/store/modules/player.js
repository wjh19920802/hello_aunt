/*
 *  文件说明
 *  日期：2021/3/17.
 *  作者：WangJinHui
 * */
const state = {
  // 当前播放视频的url
  playUrl: '',
  // 是否显示视频播放层
  showPlayer: false
}
const mutations = {
  SET_PLAY_URL(state, playUrl) {
    state.playUrl = playUrl
    state.showPlayer = true
  },
  CLOSE_PLAYER(state, showPlayer) {
    state.showPlayer = showPlayer
  }
}

const actions = {
  SetPlayUrl({ commit }, playUrl) {
    commit('SET_PLAY_URL', playUrl)
  },
  ClosePlayer({ commit }, showPlayer) {
    commit('CLOSE_PLAYER', showPlayer)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
