export default {
  state: {
    currentNotification: null
  },

  getters: {
    notification: state => state.currentNotification
  },

  mutations: {
    updateNotification(state, payload) {
      if (payload.notification !== null && Object.keys(payload.notification).length) {
        state.currentNotification = payload.notification
      }
    },

    resetNotification(state) {
      state.currentNotification = null
    }
  },

  actions: {
    notify({commit}, payload) {
      commit('updateNotification', payload)
      setTimeout(() => { commit('resetNotification') }, 3000)
    }
  }
}
