declare namespace Router {
  type Route = {
    path: string;
    view: View.ViewConstructor;
    name: string;
  };

  type Routes = {
    data: Route[];
    notFoundView: View.ViewConstructor;
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
}
