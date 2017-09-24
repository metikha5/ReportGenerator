/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/22/17
 */

// const {dialog} = require('electron').remote

import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

const dialog = remote.dialog

class FileHandler {
  constructor() {
    this.selectedFile = null
  }

  create() {
    return new Promise((resolve, reject) => {
      dialog.showSaveDialog({filters: [{ name: 'Json', extensions: ['json'] }]}, (fileName) => {
        if (fileName !== undefined) {
          this.selectedFile = fileName
          resolve(fileName)
        } else {
          // TODO: add except catch where used
          reject(new Error('No file selected'))
        }
      })
    })
  }

  select() {
    return new Promise((resolve, reject) => {
      dialog.showOpenDialog({filters: [{ name: 'Json', extensions: ['json'] }]}, (fileNames) => {
        if (fileNames !== undefined) {
          this.selectedFile = fileNames[0]
          resolve(fileNames[0])
        } else {
          // TODO: add except catch where used
          reject(new Error('No file selected'))
        }
      })
    })
  }

  async readFile() {
    // Let user select a file
    try {
      await this.select()
    } catch (e) {
      return Promise.reject(new Error(e))
    }
    const selectedFile = this.selectedFile

    return new Promise((resolve, reject) => {
      fs.readFile(selectedFile, 'utf-8', function(err, data) {
        if (err) {
          reject(new Error(`Error reading file : ${path.basename(selectedFile)}`)); return
        }

        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(new Error('Unable to parse file data'))
        }
      })
    })
  }

  async saveFile(content) {
    if (this.selectedFile === null) {
      try {
        await this.create()
      } catch (e) {
        return Promise.reject(new Error(e))
      }
    }

    const selectedFilename = path.basename(this.selectedFile)
    fs.writeFile(this.selectedFile, JSON.stringify(content, null, 2), function(err) {
      if (err) {
        return Promise.reject(new Error(`Error saving file: ${selectedFilename}`))
      } else {
        return Promise.resolve('File saved !')
      }
    })
  }
}

export default new FileHandler()
