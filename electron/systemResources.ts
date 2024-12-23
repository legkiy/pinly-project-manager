import osUtils from 'os-utils';

function getSystemResources() {
  setInterval(async () => {
    const [cpu, ram, driveUsed] = await Promise.all([
      new Promise((resolve) => osUtils.cpuUsage(resolve)),
      1 - osUtils.freememPercentage(),
      new Promise((resolve) =>
        osUtils.harddrive((total, free, used) => resolve(used))
      ),
    ]);
    console.log({ cpu, ram, driveUsed });
  }, 500);
}

export default getSystemResources;
