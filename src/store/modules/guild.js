/*
 *  文件说明
 *  日期：2021/4/8.
 *  作者：WangJinHui
 * */
import { getGuildDetail } from 'api/guild'
const state = {
  guildInfo: {},
  guildStatus: -1,
  guildPresidentInfo: {}
}
const mutations = {
  SET_GUILD_INFO(state, guildInfo) {
    state.guildInfo = guildInfo
  },
  SET_GUILD_STATUS(state, guildStatus) {
    state.guildStatus = guildStatus
  }
}

const actions = {
  async setGuildInfo({ commit }, guildInfo) {
    if (guildInfo) {
      commit('SET_GUILD_INFO', guildInfo)
    } else {
      const res = await getGuildDetail()
      if (res.result === '0') {
        if (res.data) {
          commit('SET_GUILD_INFO', res.data)
        } else {
          commit('SET_GUILD_INFO', {})
        }
      }
    }
  },
  setGuildStatus({ commit }, guildStatus) {
    commit('SET_GUILD_STATUS', guildStatus)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
