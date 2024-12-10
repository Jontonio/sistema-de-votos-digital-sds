import { app, BrowserWindow } from 'electron'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
  })

  win.loadURL('http://localhost:5174')
  win.setMenu(null); // don´t show menubar
  win.maximize(); // inicializate max screen 

}

app.whenReady().then(createWindow)