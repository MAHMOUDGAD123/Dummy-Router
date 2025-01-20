import PATH from "@/utils/path";

export default class Router {
  private static __instance: Router | null = null;
  private static _current: Router.DummyRoute | null = null;
  private static _currentPath: string = "";
  private _routeMap: Map<string, Router.DummyRoute> | null = null;
  private static __notFoundView: View.ViewConstructor | null = null;
  private static _dummyCache: Map<string, Router.CacheInfo> | null = null;
  private static _dummyCacheMaxAge: number = 0;
  private static _dummyCacheEnebled: boolean = !1;
  private static _immortalDummyCache: boolean = !1;

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
    const fixedLoc = PATH.fixPath(location.pathname);
    const matchedDummyRoute = this.matchPath(fixedLoc);
    this.historyReplace(fixedLoc); // to set the initial history state to avoid (null)
    this.updateCurrent(matchedDummyRoute, fixedLoc);
    Router.__instance = this; // set the singleton instance
    Router.clearDummyCacheInterval();
    if (import.meta.env.DEV) {
      this.logger();
    }
  }

  // PRIVATES
  // ===========================================================================================
  private get routeMap() {
    return this._routeMap!;
  }

  private matchPath = (fixedPath: string) => {
    const dummyPath = PATH.pathToDummyPath(fixedPath);
    const dummyRoute = this.routeMap.get(dummyPath);
    return dummyRoute;
  };

  private dummyNotFoundRoute = (path: string) => {
    return {
      path: "",
      dummyPath: "",
      params: null,
      view: Router.__notFoundView!,
      static: PATH.getStaticRoutes(path),
    };
  };

  private updateCurrent = (
    dummyRoute: Router.DummyRoute | undefined,
    path: string
  ) => {
    Router._current = dummyRoute ?? this.dummyNotFoundRoute(path);
    Router._currentPath = path;
    Router.preRender();
    new Router.current.view().render(path);
  };

  private buildRouteMap = (routes: Router.Route[]) => {
    // this map will remove redundant routes too
    this._routeMap = new Map(
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

  private historyReplace = (path: string) => {
    history.replaceState({ path }, "", path);
  };
  private historyPush = (path: string) => {
    history.pushState({ path }, "", path);
  };

  private logger = async () => {
    setTimeout(() => {
      console.clear();
      console.log("current:", Router.current);
      // console.log("current-path:", Router.currentPath);
      console.log("cache:", Router._dummyCache);
      // console.log("history-state:", Router.historyState);
      // console.log("routeMap:", this.routeMap);
    }, 0);
  };
  // ===========================================================================================

  // PUBLICS
  // ===========================================================================================
  public navigateTo = (path: string, replace: boolean = !1) => {
    if (replace) {
      this.historyReplace(path);
    } else {
      this.historyPush(path);
    }
  };

  public linkClickNavigation = async (e: MouseEvent) => {
    const linkEle = (e.target as HTMLElement).closest(
      `a[data-link]`
    ) as HTMLAnchorElement;

    if (linkEle) {
      e.preventDefault();
      const path = PATH.fixPath(new URL(linkEle.href).pathname);
      const dummyPath = PATH.pathToDummyPath(path);

      if (dummyPath !== Router.current.dummyPath) {
        const matchedDummyRoute = this.matchPath(path);
        this.navigateTo(path, linkEle.hasAttribute("replace"));
        this.updateCurrent(matchedDummyRoute, path);
        if (import.meta.env.DEV) {
          this.logger();
        }
      }
    }
  };

  public popStateNavigation = async () => {
    const path = Router.historyState.path;
    const matchedDummyRoute = this.matchPath(path);
    this.updateCurrent(matchedDummyRoute, path);
    if (import.meta.env.DEV) {
      this.logger();
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
      const link = ele as HTMLAnchorElement;
      const linkPath = new URL(link.href).pathname;
      const isTheSameRoute = linkPath === Router.currentPath;
      const isActive = link.hasAttribute("strict-active")
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

  /** this function called by the view after the render is done */
  public static postRender = async () => {
    Router.setActiveLinks();
  };

  /** this function called by the view before the render */
  public static preRender = async () => {
    Router.setActiveLinks();
  };

  public static useParams = () => {
    return Router.getMatchedParams();
  };
  // ===========================================================================================
}
