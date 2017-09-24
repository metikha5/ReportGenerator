import Vue from 'vue'
import Vuex from 'vuex'

import PlotStore from './plot/plots.store'
import NotificationStore from './global/notifications.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    plot: PlotStore,
    notification: NotificationStore
  }
  // strict: true
})

console.log(store)
export default store
