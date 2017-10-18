import sqlite from 'sqlite-sync'

export default {
  init_database(databasePath) {
    sqlite.connect(databasePath)
  },

  _getTableColumns(table) {
    return new Promise((resolve, reject) => {
      sqlite.run(`PRAGMA table_info(${table});`, function(res) {
        if (res.error) {
          reject(new Error(res.error))
        } else {
          resolve({
            target: table.split('snapshotmodel')[0],
            elements: res.map(c => c.name)
          })
        }
      })
    })
  },

  getTablesColumns() {
    const targetTables = ['tanksnapshotmodel', 'actuatorsnapshotmodel', 'providersnapshotmodel']
    return Promise.all(targetTables.map(t => this._getTableColumns(t)))
  },

  _getTanks() {
    return new Promise((resolve, reject) => {
      sqlite.run('SELECT name FROM tankmodel;', function(res) {
        if (res.error) {
          reject(new Error(res.error))
        } else {
          resolve({
            target: 'tank',
            elements: res.map(c => c.name)
          })
        }
      })
    })
  },

  _getActuators() {
    return new Promise((resolve, reject) => {
      sqlite.run('SELECT src, sink FROM actuatormodel;', function(res) {
        if (res.error) {
          reject(new Error(res.error))
        } else {
          resolve({
            target: 'actuator',
            elements: res.map(c => `${c.src}->${c.sink}`)
          })
        }
      })
    })
  },

  _getProviders() {
    return new Promise((resolve, reject) => {
      sqlite.run('SELECT name FROM providermodel;', function(res) {
        if (res.error) {
          reject(new Error(res.error))
        } else {
          resolve({
            target: 'provider',
            elements: res.map(c => c.name)
          })
        }
      })
    })
  },

  getElementsNames() {
    return Promise.all([
      this._getTanks(),
      this._getActuators()
      // this._getProviders()
    ])
  }
}
