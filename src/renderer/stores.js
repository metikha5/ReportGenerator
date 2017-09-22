import Vue from 'vue'
import Vuex from 'vuex'

import PlotStore from './plot/plots.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    plot: PlotStore
  },
  strict: true
})

console.log(store)
export default store
