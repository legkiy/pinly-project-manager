import { app, ipcMain, WebContents, WebFrameMain } from 'electron';
import path from 'path';
import { pathToFileURL } from 'url';

export const devLocalhost = '3333';

export function ipcHandler<Key extends keyof IEventPayloadyMapping>(
  eventName: Key,
  callback: () => IEventPayloadyMapping[Key]
) {
  ipcMain.handle(eventName, (event) => {
    validateEventFrame(event.senderFrame);
    return callback();
  });
}

export function ipcWebContentsSend<Key extends keyof IEventPayloadyMapping>(
  eventName: Key,
  webContents: WebContents,
  payload: IEventPayloadyMapping[Key]
) {
  webContents.send(eventName, payload);
}

export const isDev = process?.env?.NODE_ENV === 'development';

export const uiPath = path.join(app.getAppPath(), '/pre-dist/react/index.html');

export function validateEventFrame(frame: WebFrameMain | null) {
  if (isDev && frame?.url && new URL(frame?.url).host === 'localhost:' + devLocalhost) {
    return;
  }
  if (frame?.url !== pathToFileURL(uiPath).toString()) {
    throw new Error('Malicious event');
  }
}
