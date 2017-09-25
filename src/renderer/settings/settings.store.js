/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/23/17
 */

// TODO: make the settings load from config file
// TODO: use https://github.com/sindresorhus/electron-store
export default {
  state: {
    pythonPath: '/usr/local/bin/python',
    generatorPath: '/Users/metikha/Documents/projects/RTC4Water/gpc/watergpc_generic/toolkit/reports/report_generator.py',
    databasePath: '/Users/metikha/Documents/projects/RTC4Water/gpc/bous/outputs/run29/GPC.db'
  },
  getters: {
    pythonPath: state => state.pythonPath,
    generatorPath: state => state.generatorPath,
    databasePath: state => state.databasePath
  }
}
