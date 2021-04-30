/*
 *  文件说明
 *  日期：2021/3/8.
 *  作者：WangJinHui
 * */
const img = require('@/assets/avator_position.png')
import { getVipDetail } from '@/api/user'
const state = {
  token: '',
  // 用户信息
  // vipGuildId: null, // 公会id
  // vipRole: 1, 会员权限 1：会长 2：管理员 3:会员 4：普通用户
  userInfo: {},
  active: 0, // 当前所在tabbar
  keepAlive: ['Home', 'Search'], // 需要缓存的页面
  isChangeTabbar: false,
  showPublishWrap: false,
  avator_position: img,
  messageNum: false
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_ACTIVE(state, active) {
    state.active = active
  },
  SET_Keep_ALIVE(state, keepAlive) {
    state.keepAlive = keepAlive
  },
  SET_IS_CHANGE_TABBAR(state, isChangeTabbar) {
    state.isChangeTabbar = isChangeTabbar
  },
  SET_SHOW_PUBLISH_WRAP(state, showPublishWrap) {
    state.showPublishWrap = showPublishWrap
  },
  SET_TOCKEN(state, token) {
    state.token = token
  },
  SET_MESSAGENUM(state, num) {
    console.log('SET_MESSAGENUM', num)
    state.messageNum = num
  }
}

const actions = {
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  setUserInfo({ commit }, userInfo) {
    if (userInfo) {
      commit('SET_USER_INFO', userInfo)
    } else {
      getVipDetail().then(res => {
        console.log(res)
        if (res.result === '0') {
          if (res.data) {
            commit('SET_USER_INFO', res.data)
          } else {
            commit('SET_USER_INFO', { vipRole: 4 })
          }
        }
      })
    }
  },
  setActive({ commit }, active) {
    commit('SET_ACTIVE', active)
  },
  setKeepAlive({ commit }, keepAlive) {
    commit('SET_Keep_ALIVE', keepAlive)
  },
  setIsChangeTabbar({ commit }, isChangeTabbar) {
    commit('SET_IS_CHANGE_TABBAR', isChangeTabbar)
  },
  setShowPublishWrap({ commit }, showPublishWrap) {
    commit('SET_SHOW_PUBLISH_WRAP', showPublishWrap)
  },
  setMessageNum({ commit }, num) {
    console.log('setMessageNum', num)
    commit('SET_MESSAGENUM', num)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
