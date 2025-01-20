declare namespace Router {
  type Route = {
    path: string;
    view: View.ViewConstructor;
    name: string;
  };

  type Routes = {
    data: Route[];
    notFound: View.ViewConstructor;
  };

  type DummyRoute = {
    path: string;
    dummyPath: string;
    view: View.ViewConstructor;
    params: RegExpMatchArray | null;
    static: RegExpMatchArray | null;
  };

  type ValidatedRoute = {
    route: Route;
    isMatch: boolean;
  };

  type HistoryParams = {
    [k: string]: string;
  };

  type HistoryState = {
    path: string;
  };

  type DummyFetchOptions = {
    /**
     * - used to cache this route or not
     * - if this option is falsy all options will be ignored too
     * @default true
     */
    cachable?: boolean;
    /**
     * - this is the cache 'key' that the router will use to hash the data in cache store
     * - if cacheTarget is provided the router will use it to get and store the data - else the router will just use the currnet pathname
     * @default Router.currentPath
     */
    cacheTarget?: string;
    /**
     * the cache timeout im ms (default is 5 minutes)
     * @default 300000 ms
     */
    cacheTimeout?: number;
  };
}
