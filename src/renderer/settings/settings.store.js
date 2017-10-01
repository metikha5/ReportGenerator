/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import ElectronStorage from 'electron-store'
const storage = new ElectronStorage()

export default {
  state: {
    pythonPath: null,
    generatorPath: null,
    databasePath: null
  },
  getters: {
    pythonPath(state) {
      state.pythonPath = storage.get('pythonPath')
      return state.pythonPath
    },
    generatorPath(state) {
      state.generatorPath = storage.get('generatorPath')
      return state.generatorPath
    },
    databasePath(state) {
      state.databasePath = storage.get('databasePath')
      return state.databasePath
    },
    settings(state, getters) {
      return {
        pythonPath: getters.pythonPath,
        generatorPath: getters.generatorPath,
        databasePath: getters.databasePath
      }
    }
  },
  mutations: {
    pythonPathUpdate: (state, payload) => {
      storage.set('pythonPath', payload.value)
      state.pythonPath = payload.value
    },
    generatorPathUpdate: (state, payload) => {
      storage.set('generatorPath', payload.value)
      state.generatorPath = payload.value
    },
    databasePathUpdate: (state, payload) => {
      storage.set('databasePath', payload.value)
      state.databasePath = payload.value
    }
  },
  actions: {
    saveSettings: ({ commit }, payload) => {
      for (let item of payload.fields) {
        commit(item.name + 'Update', {value: item.value})
      }
    }
  }
}
