const { app, BrowserWindow, ipcMain } = require('electron');
const path = require ('path');
const fs = require('fs');
const os = require('os');


let mainWindow = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.webContents.openDevTools()
  mainWindow.maximize()
  let contents = mainWindow.webContents;
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
}

ipcMain.on('form-submission', function (event, firstname) {
  console.log("this is the firstname from the form ->", firstname)
});

ipcMain.on('teste-disney', function (event, oxi) {
  console.log(oxi)
});


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})