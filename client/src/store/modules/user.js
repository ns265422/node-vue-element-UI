const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否認證通過
  SET_USER: 'SET_USER' // 用户資料
}

const state = {
  isAutnenticated: false, // 是否認證
  user: {} // 儲存用户資料
}

const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated) state.isAutnenticated = isAutnenticated
    else state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user) state.user = user
    else state.user = {}
  }
}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
  }
}

export default ({
  types,
  state,
  getters,
  mutations,
  actions
})
