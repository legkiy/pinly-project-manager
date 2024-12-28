import { app, BrowserWindow, screen } from 'electron';
import path from 'path';
import os from 'os';
import getSystemResources from './systemResources.js';
import { devLocalhost, ipcHandler, isDev, uiPath } from './lib.js';

app.on('ready', () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width,
    height,
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
