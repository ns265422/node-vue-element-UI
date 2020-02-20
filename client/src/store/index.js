import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
  // strict: debug

export default new Vuex.Store({
  modules: {
    user
  }
})
