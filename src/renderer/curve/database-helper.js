import sqlite from 'sqlite-sync'

export default {
  initDatabase(databasePath) {
    sqlite.connect(databasePath)
  },

  _getTableColumns(table) {
    return new Promise((resolve, reject) => {
      sqlite.run(`PRAGMA table_info(${table});`, function(res) {
        if (res.error) {
          reject(new Error(res.error))
        } else {
          resolve({
            target: `${table.split('snapshotmodel')[0]}s`,
            elements: res.map(c => c.name)
              .filter(c => c !== 'id' && c !== 'date' && !c.endsWith('_id'))
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
            target: 'tanks',
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
            target: 'actuators',
            elements: res.map(c => `${c.src}->${c.sink}`)
          })
        }
      })
    })
  },

  _getProviders() {
    return new Promise((resolve, reject) => {
      sqlite.run('SELECT reservoir_name FROM providermodel;', function(res) {
        if (res.error) {
          reject(new Error(res.error))
        } else {
          resolve({
            target: 'providers',
            elements: res.map(c => c.reservoir_name)
          })
        }
      })
    })
  },

  getElementsNames() {
    return Promise.all([
      this._getTanks(),
      this._getActuators(),
      this._getProviders()
    ])
  }
}
