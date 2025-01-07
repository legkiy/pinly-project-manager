/**
 * Generate id key by date
 */
export function generateId(index: number = Math.random()) {
  return (Date.now() + Math.random() * index).toString(36);
}

/**
 * @param count counts of mock objects
 * @param callback for generate mock object
 */
export function createMockArray<T>(count: number, callback: (step: number, id: string) => T): T[] {
  return Array.from({ length: count }, (_, i) => {
    const id = generateId(i);
    return callback(i, id);
  });
}
