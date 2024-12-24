type SystemResources = {
  cpu: number;
  ram: number;
  driveUsed: number;
};

interface IEventPayloadyMapping {
  systemResources: SystemResources;
  getStaticData: { cpu: os.CpuInfo };
}

interface IElectron {
  systemResources: (callback: (systemResources: SystemResources) => void) => () => void;
  getStaticData: () => Promise<{ cpu: os.CpuInfo }>;
}

interface Window {
  electron: IElectron;
}
