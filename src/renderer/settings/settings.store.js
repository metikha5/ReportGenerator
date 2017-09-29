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
    }
  },
  mutations: {
    updatePythonPath: (state, payload) => {
      storage.set('pythonPath', payload.pythonPath)
      state.pythonPath = payload.pythonPath
    },
    updateGeneratorPath: (state, payload) => {
      storage.set('generatorPath', payload.generatorPath)
      state.generatorPath = payload.generatorPath
    },
    updateDatabasePath: (state, payload) => {
      storage.set('databasePath', payload.databasePath)
      state.databasePath = payload.databasePath
    }
  }
}
