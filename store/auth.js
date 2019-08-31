export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    const { uid, email, displayName } = user
    state.user = {
      uid,
      email,
      displayName
    }
  }
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  }
}
