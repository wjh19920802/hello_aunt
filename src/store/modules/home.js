/*
 *  文件说明
 *  日期：2021/3/15.
 *  作者：WangJinHui
 * */

const state = {
  // 当前播放视频的url
  playUrl: '',
  // 头部导航栏相关信息
  tabScroll: {
    0: {
      isCurrent: true,
      scroll: 0
    }
  },
  // 切换tabbar时记录home页面滚动位置
  homeScroll: 0,
  keyList: [],
  key: 1
}
const mutations = {
  SET_TAB_SCROLL(state, tabScroll) {
    state.tabScroll = tabScroll
  },
  SET_HOME_SCROLL(state, homeScroll) {
    state.homeScroll = homeScroll
  },
  SET_KEY_LIST(state, keyList) {
    state.keyList = keyList
  },
  SET_KEY(state, key) {
    state.key = key
  }
}

const actions = {
  SetTabScroll({ commit }, tabScroll) {
    commit('SET_TAB_SCROLL', tabScroll)
  },
  SetHomeScroll({ commit }, homeScroll) {
    commit('SET_HOME_SCROLL', homeScroll)
  },
  SetKeyList({ commit }, keyList) {
    commit('SET_KEY_LIST', keyList)
  },
  SetKey({ commit }, key) {
    commit('SET_KEY', key)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
