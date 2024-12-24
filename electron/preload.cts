const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  systemResources: (callback: (statistic: any) => void) => ipcOn('systemResources', (data) => callback(data)),
  getStaticData: () => ipcInvoke('getStaticData'),
} satisfies Window['electron']);

export function ipcInvoke<Key extends keyof IEventPayloadyMapping>(
  eventName: Key
): Promise<IEventPayloadyMapping[Key]> {
  return electron.ipcRenderer.invoke(eventName);
}

export function ipcOn<Key extends keyof IEventPayloadyMapping>(
  eventName: Key,
  callback: (payload: IEventPayloadyMapping[Key]) => void
) {
  const cb = (event: Electron.IpcRendererEvent, payload: any) => callback(payload);

  electron.ipcRenderer.on(eventName, cb);
  return () => electron.ipcRenderer.off(eventName, cb);
}
