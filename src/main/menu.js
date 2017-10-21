// import EventBus from '../renderer/global/event-bus'
const { Menu, BrowserWindow } = require('electron')
const electron = require('electron')
const app = electron.app

const template = [
  {
    label: 'File',
    submenu: [{
      label: 'New',
      accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
      click(item, focus) {
        var focusedWindow = BrowserWindow.getFocusedWindow()
        focusedWindow.webContents.send('new')
      }
    },
    {
      label: 'Load',
      accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+O',
      click(item, focus) {
        var focusedWindow = BrowserWindow.getFocusedWindow()
        focusedWindow.webContents.send('load')
      }
    },
    {
      label: 'Save',
      accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
      click(item, focus) {
        var focusedWindow = BrowserWindow.getFocusedWindow()
        focusedWindow.webContents.send('save')
      }
    },
    {
      label: 'Run',
      accelerator: process.platform === 'darwin' ? 'Command+R' : 'Ctrl+R',
      click(item, focus) {
        var focusedWindow = BrowserWindow.getFocusedWindow()
        focusedWindow.webContents.send('run')
      }
    }]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          console.log('Hello you')
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  )
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
}

const menu = Menu.buildFromTemplate(template, {'node-integration': true})
Menu.setApplicationMenu(menu)
