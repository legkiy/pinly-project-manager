export function createEntityRouteMap<T extends Record<string, (id: string | number) => string>>(
  rootPath: string,
  additionalRoutes?: (rootPath: string) => T
): {
  root: string;
  id: (id: string | number) => string;
} & T {
  const cleanPath = rootPath.replace(/^\//, '');
  return {
    root: `/${cleanPath}`,
    id: (id: string | number) => `/${cleanPath}/${id}`,
    ...(additionalRoutes?.(cleanPath) ?? ({} as T)),
  };
}
