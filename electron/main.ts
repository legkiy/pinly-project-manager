import { app, BrowserWindow } from 'electron';
import path from 'path';
import os from 'os';
import getSystemResources from './systemResources.js';
import { devLocalhost, ipcHandler, isDev, uiPath } from './lib.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(app.getAppPath(), './dist-electron/preload.cjs'),
      devTools: isDev ? true : false,
    },
  });

  if (isDev) {
    mainWindow.loadURL(`http://localhost:${devLocalhost}`);
  } else {
    mainWindow.loadFile(uiPath);
  }

  getSystemResources(mainWindow);

  ipcHandler('getStaticData', () => {
    const cpu = os.cpus()[0];
    return { cpu };
  });
});
