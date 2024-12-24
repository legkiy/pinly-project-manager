import { BrowserWindow } from 'electron';
import osUtils from 'os-utils';
import { ipcWebContentsSend } from './lib.js';

function getSystemResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const [cpu, ram, driveUsed] = await Promise.all<number>([
      new Promise((resolve) => osUtils.cpuUsage(resolve)),
      1 - osUtils.freememPercentage(),
      new Promise((resolve) => osUtils.harddrive((total, free, used) => resolve(used))),
    ]);

    ipcWebContentsSend('systemResources', mainWindow.webContents, { cpu, ram, driveUsed });
  }, 500);
}

export default getSystemResources;
