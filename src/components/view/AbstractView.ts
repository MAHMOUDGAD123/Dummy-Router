import Router from "@/router/router";

export default abstract class AbstractView {
  protected static readonly loadingStateRenderDelay: number = 100; // ms
  protected readonly title: string = "DR";
  protected readonly params: { [k: string]: string } = {};
  private readonly defaultRenderTargetId: string = "__main__";
  protected readonly renderTargets: { [k: string]: string } = {};
  private renderElementId: string = this.defaultRenderTargetId;
  private canRenderLoadingState: boolean = true;

  protected setTitle(): void {
    document.title = this.title;
  }

  protected async getStaticHTML(_props: { [k: string]: any }): Promise<string> {
    return "";
  }

  protected async getDynamicHTML(_props: {
    [k: string]: any;
  }): Promise<string> {
    return "";
  }

  public async getHTML(_dynamicOnly?: boolean): Promise<string> {
    return "";
  }

  protected async loading(currentPath: string): Promise<void> {
    setTimeout(() => {
      if (!this.canRenderLoadingState || currentPath !== location.pathname)
        return;
      document.getElementById(this.renderElementId)!.innerHTML = `
        <div class='w-full mt-[120px] flex items-center justify-center'>
          <div class='w-[50px] aspect-square border-[5px] border-solid border-x-dodgerblue border-y-transparent rounded-full animate-spin'></div>
        </div>
      `;
    }, AbstractView.loadingStateRenderDelay);
  }

  protected async error(err: Error): Promise<string> {
    return `
      <div class='flex flex-col gap-[15px] my-[70px]'>
        <i class="fa-solid fa-face-frown text-[5rem]"></i>
        <h1 class='text-[1.75rem] font-extrabold font-saira'>Sad Dummy</h1>
        <p>${err.message}</p>
      </div>
    `;
  }

  public async render(
    currentPath: string,
    renderTargetId: string | null
  ): Promise<void> {
    let renderdynamicHTMLOnly = false;

    // change the render target if exists
    // else use the default __main__
    if (renderTargetId) {
      this.renderElementId = renderTargetId;
      renderdynamicHTMLOnly = true;
    }

    this.loading(currentPath); // show loader until data load
    const html = await this.getHTML(renderdynamicHTMLOnly);
    this.canRenderLoadingState = false; // prevent loading state render
    const canRender = currentPath === location.pathname;

    if (canRender) {
      document.getElementById(this.renderElementId)!.innerHTML = html;
      Router.postRender();
    }
  }
}
