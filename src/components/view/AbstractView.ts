import Router from "@/router/router";

export default class AbstractView implements View.AbstractViewType {
  canRenderLoadingState: boolean = true;
  readonly loadingStateRenderDelay: number = 100; // ms
  readonly renderElementSelector: string = "main";

  constructor(title?: string) {
    if (title) this.setTitle(title);
  }

  setTitle(title: string) {
    document.title = title;
  }

  async getHTML() {
    return "";
  }

  async loading(currentPath: string) {
    setTimeout(() => {
      if (!this.canRenderLoadingState || currentPath !== location.pathname)
        return;
      document.querySelector(this.renderElementSelector)!.innerHTML = `
        <div class='w-full mt-[120px] flex items-center justify-center'>
          <div class='w-[50px] aspect-square border-[5px] border-solid border-x-dodgerblue border-y-transparent rounded-full animate-spin'></div>
        </div>
      `;
    }, this.loadingStateRenderDelay);
  }

  async error(err: Error) {
    return `
      <div class='flex flex-col gap-[15px] my-[70px]'>
        <i class="fa-solid fa-face-frown text-[5rem]"></i>
        <h1 class='text-[1.75rem] font-extrabold font-saira'>Sad Dummy</h1>
        <p>${err.message}</p>
      </div>
    `;
  }

  async render(currentPath: string) {
    this.loading(currentPath); // show loader until data load
    const html = await this.getHTML();
    this.canRenderLoadingState = false; // prevent loading state render
    const canRender = currentPath === location.pathname;
    if (canRender) {
      document.querySelector(this.renderElementSelector)!.innerHTML = html;
      Router.postRender();
    }
  }
}
