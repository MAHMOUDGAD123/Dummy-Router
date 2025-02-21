declare namespace View {
  interface AbstractViewType {
    readonly #loadingStateRenderDelay: number;
    readonly title: string;
    readonly params: { [k: string]: string };
    readonly renderTargets: { [k: string]: string };
    #renderElementId: string;
    #canRenderLoadingState: boolean;

    /**
     * - this function is used to set the title of the page with the (this.title)
     *   provided in the view.
     * - otherwise, it will use the inherited value of it
     */
    setTitle(): void;

    /**
     * this function will return the static part of the view
     * this means that the router won't re-render this static part when the user click a link.
     * @param _props optional props for fetching purposes or pasing a data
     */
    getStaticHTML(_props?: { [k: string]: any }): Promise<string>;

    /**
     * this function will return the dynamic part of the view.
     * this means that the router will update this part on re-render.
     * @param _props optional props for fetching purposes or pasing a data
     */
    getDynamicHTML(_props?: { [k: string]: any }): Promise<string>;

    /**
     * this function get the html string that is going to render
     * @param _dynamicOnly comes from the View.render function to render the dynamic part only or to render the whole template
     * @returns
     */
    getHTML(_dynamicOnly?: boolean): Promise<string>;

    /**
     * this function will render the loader spinner to user until the getHTML() method get the html.
     * @param currentPath the current pathname
     */
    loading(currentPath: string): Promise<void>;

    /**
     * this function will get the html error remplate to render if an error occur on rendering.
     * @param err the error object
     */
    error(err: Error): Promise<string>;

    /**
     * this function controls the rendering process.
     * @param currentPath the curent pathname
     * @param renderTargetId the id of the render element that is going to be the target of the rendering
     */
    render(currentPath: string, renderTargetId: string | null): Promise<void>;
  }

  type ViewConstructor = new () => AbstractView;
}
