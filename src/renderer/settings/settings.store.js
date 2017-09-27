/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

import ElectronStorage from 'electron-store'

export default {
  state: {
    storage: new ElectronStorage({
      name: 'report_generator_config',
      defaults: {
        pythonPath: '/usr/local/bin/python',
        generatorPath: '/Users/metikha/Documents/projects/RTC4Water/gpc/watergpc_generic/toolkit/reports/report_generator.py',
        databasePath: '/Users/metikha/Documents/projects/RTC4Water/gpc/bous/outputs/run29/GPC.db'
      }
    })
  },
  getters: {
    pythonPath: state => state.storage.get('pythonPath'),
    generatorPath: state => state.storage.get('generatorPath'),
    databasePath: state => state.storage.get('databasePath')
  },
  mutations: {
    updatePythonPath: (state, payload) => {
      state.storage.set('pythonPath', payload.pythonPath)
    }
  }
}
