import Vue from 'vue'
import Vuex from 'vuex'

import PlotStore from './plot/plots.store'
import SettingsStore from './settings/settings.store'
import YSuggestionsStore from './curve/y-suggestions.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    plot: PlotStore,
    settings: SettingsStore,
    suggestions: YSuggestionsStore
  },
  // Strict mode currently raise warning because selected curve
  // is modified outside of the store
  strict: true
})

export default store
