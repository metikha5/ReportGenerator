export default {
  state: {
    currentNotification: null
  },

  getters: {
    notification: state => state.currentNotification
  },

  mutations: {
    updateNotification(state, payload) {
      console.log('Notification: ', payload)
      if (Object.keys(payload.notification).length) {
        state.currentNotification = payload.notification
      }
    },

    resetNotification(state) {
      state.currentNotification = null
      console.log('Reset notif')
    }
  },

  actions: {
    notify({commit}, payload) {
      console.log('notif action')
      commit('updateNotification', payload)
      setTimeout(() => { commit('resetNotification') }, 3000)
    }
  }
}
