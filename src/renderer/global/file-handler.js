/**
 * Created by BREMEC Michael <michael@bremec.fr> on 8/22/17
 */

// const {dialog} = require('electron').remote

import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import Notifications from '../global/notifications'

const dialog = remote.dialog

class FileHandler {
  constructor() {
    this.selectedFile = null
  }

  selectAFile() {
    let self = this // TODO: avoid that
    return new Promise((resolve, reject) => {
      dialog.showOpenDialog(function(fileNames) {
        if (fileNames !== undefined) {
          self.selectedFile = fileNames[0]
          resolve(fileNames[0])
        }
      })
    })
  }

  async readFile() {
    // Let user select a file
    await this.selectAFile()
    const selectedFile = this.selectedFile

    return new Promise((resolve, reject) => {
      fs.readFile(selectedFile, 'utf-8', function(err, data) {
        if (err) {
          Notifications.notify(`Error reading file : ${path.basename(selectedFile)}`)
          reject(new Error('Unable to read file')); return
        }

        try {
          resolve(JSON.parse(data))
        } catch (e) {
          Notifications.notify('Unable to parse data')
          reject(new Error('Unable to parse file data')); return
        }
        Notifications.notify('File loaded')
      })
    })
  }

  async saveFile(content) {
    if (this.selectedFile === null) {
      await this.selectAFile()
    }

    const selectedFilename = path.basename(this.selectedFile)
    fs.writeFile(this.selectedFile, JSON.stringify(content, null, 2), function(err) {
      if (err) {
        Notifications.notify(`Error saving file: ${selectedFilename}`)
        // notify("Error saving file: " + err.message);  //todo display full message ?
      } else {
        Notifications.notify('File saved !')
      }
    })
  }
}

export default new FileHandler()
