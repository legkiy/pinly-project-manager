function createMockData<T>(count: number, callback: (step: number, id: string) => T): T[] {
  return Array.from({ length: count }, (_, i) => {
    const id = (Date.now() + Math.random() * i).toString(36);
    return callback(i, id);
  });
}

export default createMockData;
