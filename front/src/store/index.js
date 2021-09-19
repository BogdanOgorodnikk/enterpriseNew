import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import allusers from './allusers'
import town from './town'
import client from './client'
import order from './order'
import productName from './productName'
import firmName from './firmName'
import optPrice from './optPrice'
import masNumber from './masNumber'
import pith from './pith'
import regionName from './regionName'
import areaName from './areaName'
import expense from './expense'
import pithName from './pithName'
import noteName from './noteName'
import comments from './comments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error,
  },
  actions: {
  },
  modules: {
    auth,
    allusers,
    town,
    client,
    order,
    productName,
    firmName,
    optPrice,
    masNumber,
    pith,
    regionName,
    areaName,
    expense,
    pithName,
    noteName,
    comments
  }
})
