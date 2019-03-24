// electron objects
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require ('path');
const fs = require('fs');
const os = require('os');

//  TODO: open backend flask server dynamic to open port

let mainWindow = null;

const createWindow = () => {
  // var subpy = require('child_process').spawn('python3', ['./image_augmentator/server.py']);
  const rq = require('request-promise');
  
  mainWindow = new BrowserWindow({ width: 800, height: 600 })
  mainWindow.loadURL(require('url').format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.webContents.openDevTools()
  mainWindow.maximize()
  mainWindow.on('closed', () => {
    mainWindow = null
    subpy.kill('SIGINT')
  })
}

// // MANDAR THREAD NO PYTHON-SHELL PARA A AUGMENTATION
// ipcMain.on('form-submission', function (event, args) {
//   // CODE HERE
// });

// // SUBMIT DO FORM
// ipcMain.on('form-submission', function (event, args) {
//   console.log("this is the firstname from the form ->", args)
// });

// // SALVAR O JSON COM AS CONFIGURAÇÕES
// ipcMain.on('save-json-configs', function (event, json) {
//   //  WRITE JSON INTO __DIRNAME/CONFIGS
// });


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})