import PATH from "@/utils/path";

export default class Router {
  private static __instance: Router | null = null;
  private static _current: Router.DummyRoute | null = null;
  private static _currentPath: string = "";
  private static _urlSearchParams: URLSearchParams | null = null;
  private static __notFoundView: View.ViewConstructor | null = null;
  private static _dummyCache: Map<string, Router.CacheInfo> | null = null;
  private static _dummyCacheMaxAge: number = 0;
  private static _dummyCacheEnebled: boolean = !1;
  private static _immortalDummyCache: boolean = !1;
  private static _routeMap: Map<string, Router.DummyRoute> | null = null;

  constructor(routes: Router.Routes, config?: Router.Config) {
    if (Router.__instance) return Router.__instance; // force singleton

    // config
    // --------------------------------------------------
    const { cache, cacheMaxAge, immortalCache } = {
      cache: config?.cache ?? !0,
      cacheMaxAge: config?.cacheMaxAge ?? 600000,
      immortalCache: config?.immortalCache ?? false,
    } as Router.Config;

    if (cache) {
      Router._dummyCache = new Map();
      Router._dummyCacheEnebled = true;
      Router._dummyCacheMaxAge = cacheMaxAge!;
      Router._immortalDummyCache = immortalCache!;
    }
    // --------------------------------------------------

    // on page load initialization
    const { data, notFound } = routes;
    Router.__notFoundView = notFound;
    this.buildRouteMap(data);
    const fixedPath = PATH.fixPath(location.pathname);
    const matchedDummyRoute = Router.matchPath(fixedPath);
    Router.setSearchParams(location.search);
    Router.historyReplace(fixedPath, null); // to set the initial history state to avoid (null)
    Router.updateCurrent(fixedPath, null, matchedDummyRoute);
    Router.clearDummyCacheInterval();
    Router.__instance = this; // set the singleton instance
    if (import.meta.env.DEV) {
      Router.logger();
    }
  }

  // PRIVATES
  // ===========================================================================================
  private static get routeMap() {
    return this._routeMap!;
  }

  private static matchPath = (fixedPath: string) => {
    const dummyPath = PATH.pathToDummyPath(fixedPath);
    const dummyRoute = Router.routeMap.get(dummyPath);
    return dummyRoute;
  };

  private static dummyNotFoundRoute = (path: string) => {
    return {
      path: "",
      dummyPath: "",
      params: null,
      view: Router.__notFoundView!,
      static: PATH.getStaticRoutes(path),
    } satisfies Router.DummyRoute;
  };

  private static setSearchParams = (searchParams: URLSearchParams | string) => {
    Router._urlSearchParams = new URLSearchParams(searchParams);
  };

  private static updateCurrent = (
    path: string,
    renderTargetId: string | null,
    dummyRoute?: Router.DummyRoute
  ) => {
    Router._current = dummyRoute ?? this.dummyNotFoundRoute(path);
    Router._currentPath = path;
    Router.preRender();
    new Router.current.view().render(path, renderTargetId);
  };

  private buildRouteMap = (routes: Router.Route[]) => {
    // this map will remove redundant routes too
    Router._routeMap = new Map(
      routes.map((route) => {
        const path = PATH.fixPath(route.path);
        const dummyPath = PATH.pathToDummyPath(path);
        const params = PATH.getParams(path);

        return [
          dummyPath,
          {
            path,
            dummyPath,
            view: route.view,
            params: params,
            static: PATH.getStaticRoutes(dummyPath),
          },
        ];
      })
    );
  };

  private static historyReplace = (
    path: string,
    renderTargetId: string | null
  ) => {
    history.replaceState(
      { path, renderTargetId },
      "",
      Router.getPathQuery(path)
    );
  };
  private static historyPush = (
    path: string,
    renderTargetId: string | null
  ) => {
    history.pushState({ path, renderTargetId }, "", Router.getPathQuery(path));
  };

  private static updateHistory = (
    path: string,
    replace: boolean = !1,
    renderTargetId: string | null
  ) => {
    if (replace) {
      this.historyReplace(path, renderTargetId);
    } else {
      this.historyPush(path, renderTargetId);
    }
  };

  private static logger = async (moreData?: any) => {
    setTimeout(() => {
      console.clear();
      console.log("\x1b[32m\x1b[1m>> Dummy Router Info:", {
        current: Router.current,
        currentPath: Router.currentPath,
        dummyCache: Router._dummyCache,
        historyState: Router.historyState,
        routeMap: this.routeMap,
        urlSearchParams: Object.fromEntries(Router._urlSearchParams!.entries()),
        pathQuery: Router.getPathQuery(),
        moreData,
      });
    }, 0);
  };
  // ===========================================================================================

  // PUBLICS
  // ===========================================================================================
  public static navigateTo = async (
    pathQuery: string,
    renderTargetId: string
  ) => {
    const url = new URL(location.origin + pathQuery);

    if (pathQuery !== Router.getPathQuery()) {
      const pathname = url.pathname;
      const matchedDummyRoute = Router.matchPath(pathname);
      Router.setSearchParams(url.searchParams);
      Router.historyPush(pathname, renderTargetId);
      Router.updateCurrent(pathname, renderTargetId, matchedDummyRoute);
      if (import.meta.env.DEV) {
        Router.logger(url.search);
      }
    }
  };

  public linkClickNavigation = async (e: MouseEvent) => {
    const linkEle = (e.target as HTMLElement).closest(
      `a[data-link]`
    ) as Types.AbstractLinkType;

    if (linkEle) {
      e.preventDefault();
      const url = new URL(linkEle.href);
      const fixedPath = PATH.fixPath(url.pathname);

      if (fixedPath !== Router.currentPath) {
        const matchedDummyRoute = Router.matchPath(fixedPath);
        const renderTargetId = linkEle.renderTarget;
        Router.setSearchParams(url.searchParams);
        Router.updateHistory(fixedPath, linkEle.replace, renderTargetId);
        Router.updateCurrent(fixedPath, renderTargetId, matchedDummyRoute);
        if (import.meta.env.DEV) {
          Router.logger();
        }
      }
    }
  };

  public popStateNavigation = async () => {
    const { path, renderTargetId } = Router.historyState;
    const matchedDummyRoute = Router.matchPath(path);
    Router.setSearchParams(location.search);
    Router.updateCurrent(path, renderTargetId, matchedDummyRoute);
    if (import.meta.env.DEV) {
      Router.logger();
    }
  };
  // ===========================================================================================

  // STATICS
  // ===========================================================================================
  private static getMatchedParams = (): { [k: string]: string } | null => {
    const routeParams = Router.current.params;
    const pathParams = PATH.getParams(Router.currentPath);

    if (routeParams && pathParams) {
      const params = Object.create(null);
      for (let i = 0; i < routeParams.length; ++i) {
        params[routeParams[i]] = pathParams[i];
      }
      return params;
    }
    return null;
  };

  public static getPathQuery(path?: string) {
    const pathname = path ?? location.pathname;
    return Router._urlSearchParams?.size
      ? `${pathname}?${Router._urlSearchParams.toString()}`
      : pathname;
  }

  public static get historyState() {
    return history.state as Router.HistoryState;
  }

  public static get current() {
    return Router._current!;
  }
  public static get currentPath() {
    return Router._currentPath!;
  }

  private static matchLinkActiveStaticRoutes = (linkPath: string) => {
    const linkStaticRoutes = PATH.getStaticRoutes(linkPath);
    const currentStaticRoutes = Router.current.static;

    if (!linkStaticRoutes || !currentStaticRoutes) {
      if (Router.current.path === "/" && linkPath === "/") return true;
      return false;
    }

    let A = currentStaticRoutes,
      B = linkStaticRoutes;

    if (A.length - B.length > 0) [A, B] = [B, A]; // swap

    for (let i = 0, len = A.length; i < len; ++i)
      if (A[i] !== B[i]) return false;
    return true;
  };

  private static setActiveLinks = async () => {
    document.querySelectorAll("a[data-nav]").forEach((ele) => {
      const link = ele as Types.AbstractLinkType;
      const linkPath = new URL(link.href).pathname;
      const isTheSameRoute = linkPath === Router.currentPath;
      const isActive = link.strictActive
        ? isTheSameRoute
        : this.matchLinkActiveStaticRoutes(linkPath);

      if (isActive) {
        link.classList.add("active");
        isTheSameRoute
          ? link.classList.add("exact")
          : link.classList.remove("exact");
      } else {
        link.classList.remove("active", "exact");
      }
    });
  };

  public static dummyFetch = async (
    url: string | URL | Request,
    options?: Router.DummyFetchOptions
  ) => {
    // just fetch the data if router cache is disabled
    if (!Router._dummyCacheEnebled) {
      return await fetch(url).then((res) => res.json());
    }

    const { cachable, cacheTarget, cacheTimeout } = {
      cachable: options?.cachable ?? true,
      cacheTarget: options?.cacheTarget ?? Router.currentPath,
      cacheTimeout: options?.cacheTimeout ?? 180000,
    } as Router.DummyFetchOptions;

    if (cachable) {
      // get the cached data
      const cacheInfo = this._dummyCache!.get(cacheTarget!);
      if (cacheInfo) {
        const cachedValue = cacheInfo.data;
        const isAlive = Date.now() < cacheInfo.timeout;
        if (cachedValue && isAlive) return cachedValue;
      }
    }

    const data = await fetch(url).then((res) => res.json());
    if (cachable) {
      // save data in dummyCache
      Router._dummyCache!.set(cacheTarget!, {
        data,
        timeout: Date.now() + cacheTimeout!,
      });
    }
    return data;
  };

  public static clearDummyCacheInterval = async () => {
    // this function will set the clear cache interval
    // only if the router cache is enabled
    if (!Router._dummyCacheEnebled || Router._immortalDummyCache) return;
    setInterval(() => {
      Router._dummyCache!.clear();
      // setTimeout(console.log, 50, "DummyCache killed 💀");
    }, Router._dummyCacheMaxAge);
  };

  /** this function called by the updateCurrent funciton before the render */
  public static preRender = async () => {
    Router.setActiveLinks();
  };

  /** this function called by the DummyView after the render is done. */
  public static postRender = async () => {
    Router.setActiveLinks();
  };

  public static useParams = () => {
    return Router.getMatchedParams();
  };

  public static useSearchParams = () => {
    return Router._urlSearchParams;
  };
  // ===========================================================================================
}
