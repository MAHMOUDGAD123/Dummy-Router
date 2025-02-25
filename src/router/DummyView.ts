import Router from "@/router/router";

export default abstract class AbstractView implements View.AbstractViewType {
  #renderElementId: string = "__main__";
  #canRenderLoadingState: boolean = true;
  readonly #loadingStateRenderDelay: number = 100; // ms
  readonly title: string = "DR";
  readonly params: { [k: string]: string } = {};
  readonly searchParams: URLSearchParams | null = null;
  readonly renderTargets: { [k: string]: string } = {};

  setTitle(): void {
    document.title = this.title;
  }

  async getStaticHTML(_props?: { [k: string]: any }): Promise<string> {
    return "";
  }

  async getDynamicHTML(_props?: { [k: string]: any }): Promise<string> {
    return "";
  }

  async getHTML(_dynamicOnly?: boolean): Promise<string> {
    return "";
  }

  async loading(currentPath: string): Promise<void> {
    setTimeout(() => {
      if (!this.#canRenderLoadingState || currentPath !== location.pathname)
        return;
      document.getElementById(this.#renderElementId)!.innerHTML = `
        <div class='w-full mt-[120px] flex items-center justify-center'>
          <div class='w-[50px] aspect-square border-[5px] border-solid border-x-dodgerblue border-y-transparent rounded-full animate-spin'></div>
        </div>
      `;
    }, this.#loadingStateRenderDelay);
  }

  async error(err: Error): Promise<string> {
    return `
      <div class='flex flex-col gap-[15px] my-[70px]'>
        <i class="fa-solid fa-face-frown text-[5rem]"></i>
        <h1 class='text-[1.75rem] font-extrabold font-saira'>Sad Dummy</h1>
        ${(() => {
          return import.meta.env.PROD
            ? `<p>Somthing went wrong</p>`
            : `
              <p>${err.message}</p>
              <p class=" text-[0.9rem] opacity-60 p-2">${err.stack}</p>
              `;
        })()}
          </div>
    `;
  }

  async overheadWork(): Promise<void> {}

  async render(
    currentPath: string,
    renderTargetId: string | null
  ): Promise<void> {
    let renderdynamicHTMLOnly = false;

    // make sure that the (renderTargetId) was sent
    // and the element with that target id is exists
    if (renderTargetId && document.getElementById(renderTargetId) !== null) {
      this.#renderElementId = renderTargetId;
      renderdynamicHTMLOnly = true;
    }

    this.loading(currentPath); // show loader until data load
    const html = await this.getHTML(renderdynamicHTMLOnly);
    this.#canRenderLoadingState = false; // prevent loading state render
    const canRender = currentPath === location.pathname;

    if (canRender) {
      document.getElementById(this.#renderElementId)!.innerHTML = html;
      Router.postRender();
      this.overheadWork();
    }
  }
}
