class Route {
  constructor(protected rootPath: string) {}

  private _getQueryString<Q>(params?: Q): string {
    if (!params) return '';
    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();
    return `?${queryString}`;
  }

  slug(slug: string | number) {
    return new Route(`${this.rootPath}/${slug}`);
  }

  query<Q extends Record<string, unknown> = {}>(params?: Q) {
    const newRoute = `${this.rootPath}${this._getQueryString<Q>(params)}`;
    return this._checkRouteDivider(newRoute);
  }

  next(nextRoute: string) {
    const newRoute = `${this.rootPath}${this._checkRouteDivider(nextRoute)}`;
    return new Route(newRoute);
  }

  private _checkRouteDivider(route: string) {
    return route.startsWith('/') ? route : `/${route}`;
  }

  get path(): string {
    return this._checkRouteDivider(this.rootPath);
  }
}

export default Route;
