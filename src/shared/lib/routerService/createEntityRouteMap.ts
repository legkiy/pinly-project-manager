export function createEntityRouteMap(
  rootPath: string,
  additionalRoutes?: (rootPath: string) => Record<string, string | ((id: number | string) => string)>
) {
  const cleanPAth = rootPath.replace(/^\//, '');
  return {
    root: `/${cleanPAth}`,
    id: (id: number | string) => `/${cleanPAth}/${id}`,
    ...additionalRoutes?.(cleanPAth),
  };
}
