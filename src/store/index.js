/*
 *  文件说明
 *  日期：2021/3/8.
 *  作者：WangJinHui
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import home from './modules/home'
import player from './modules/player'
import guild from './modules/guild'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    home,
    player,
    guild
  },
  getters,
  plugins: [createPersistedState({ storage: window.localStorage })]
})

export default store
