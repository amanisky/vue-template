import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  loadingState: false
}

const getters = {

}

const actions = {

}

const mutations = {
  changeLoadingState (state, input) {
    state.loadingState = input
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})