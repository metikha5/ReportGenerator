/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import ElectronStorage from 'electron-store'
const storage = new ElectronStorage()

export default {
  state: {
    pythonPath: storage.get('pythonPath'),
    generatorPath: storage.get('generatorPath'),
    databasePath: storage.get('databasePath')
  },
  getters: {
    pythonPath(state) {
      return state.pythonPath
    },
    generatorPath(state) {
      return state.generatorPath
    },
    databasePath(state) {
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
    refreshConfig: (state) => {
      state.databasePath = storage.get('databasePath')
      state.generatorPath = storage.get('generatorPath')
      state.pythonPath = storage.get('pythonPath')
    },
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
