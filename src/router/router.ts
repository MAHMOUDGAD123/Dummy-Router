import PATH from "@/utils/path";

export default class Router {
  private static _instance: Router | null = null;
  private static _current: Router.DummyRoute | null = null;
  private static _currentPath: string = "";
  private _routeMap: Map<string, Router.DummyRoute> | null = null;
  private _notFoundView: View.ViewConstructor | null = null;

  constructor(routes: Router.Routes) {
    if (Router._instance) return Router._instance; // force singleton
    // page load
    const { data, notFoundView } = routes;
    this._notFoundView = notFoundView;
    this.buildRouteMap(data);
    const fixedLoc = PATH.fixPath(location.pathname);
    const matchedDummyRoute = this.matchPath(fixedLoc);
    this.historyReplace(fixedLoc); // to set the initial history state to avoid (null)

    if (matchedDummyRoute) {
      this.updateCurrent(matchedDummyRoute, fixedLoc);
    } else {
      this.renderNotFound();
    }
    this.setActiveLinks();
    this.logger();
    Router._instance = this; // set the singleton instance
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

  private renderNotFound = () => {
    const path = location.pathname;
    this.updateCurrent(
      {
        path,
        dummyPath: "",
        params: null,
        view: this._notFoundView!,
        static: PATH.getStaticRoutes(path),
      },
      path
    );
  };

  private updateCurrent = (dummyRoute: Router.DummyRoute, path: string) => {
    Router._current = dummyRoute;
    Router._currentPath = path;
    const view = new dummyRoute.view();
    view.render(path);
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

  private matchLinkActiveStaticRoutes = (linkPath: string) => {
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

  private setActiveLinks = async () => {
    document.querySelectorAll("a[data-nav]").forEach((ele) => {
      const link = ele as HTMLAnchorElement;
      const linkPath = new URL(link.href).pathname;

      if (this.matchLinkActiveStaticRoutes(linkPath)) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  private logger = async () => {
    if (import.meta.env.DEV) {
      // console.clear();
      // console.log("current:", Router.current);
      // console.log("current-path:", Router.currentPath);
      // console.log("history-state:", Router.historyState);
      // console.log("routeMap:", this.routeMap);
    }
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

        if (matchedDummyRoute) {
          this.navigateTo(path, linkEle.getAttribute("replace") !== null);
          this.updateCurrent(matchedDummyRoute, path);
        } else {
          this.renderNotFound();
        }
        this.setActiveLinks();
        this.logger();
      }
    }
  };

  public popStateNavigation = async () => {
    const path = Router.historyState.path;
    const matchedDummyRoute = this.matchPath(path);

    if (matchedDummyRoute) {
      this.updateCurrent(matchedDummyRoute, path);
    } else {
      this.renderNotFound();
    }
    this.setActiveLinks();
    this.logger();
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

  public static useParams = () => {
    return Router.getMatchedParams();
  };
  // ===========================================================================================
}
