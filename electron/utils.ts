import { ipcMain, WebContents } from 'electron';

export function ipcHandler<Key extends keyof IEventPayloadyMapping>(
  eventName: Key,
  callback: () => IEventPayloadyMapping[Key]
) {
  ipcMain.handle(eventName, () => callback());
}

export function ipcWebContentsSend<Key extends keyof IEventPayloadyMapping>(
  eventName: Key,
  webContents: WebContents,
  payload: IEventPayloadyMapping[Key]
) {
  webContents.send(eventName, payload);
}

