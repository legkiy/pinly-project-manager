import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import getSystemResources from './systemResources.js';
import { ipcHandler } from './utils.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(app.getAppPath(), './dist-electron/preload.cjs'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3333');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }

  getSystemResources(mainWindow);

  ipcHandler('getStaticData', () => {
    const cpu = os.cpus()[0];
    return { cpu };
  });
});
