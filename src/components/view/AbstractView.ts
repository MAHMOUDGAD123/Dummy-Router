import Router from "@/router/router";
import { MAIN_ELEMENT_SELECTOR } from "@/utils/contants";

export default class AbstractView implements View.AbstractViewType {
  canRenderLoadingState: boolean = true;
  loadingStateRenderDelay: number = 30; // ms

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
      document.querySelector(`${MAIN_ELEMENT_SELECTOR}`)!.innerHTML = `
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
        ${
          import.meta.env.DEV // vite env
            ? `<p>${err.message}</p>`
            : "<p>Sorry, somthing went wrong</p>"
        }
      </div>
    `;
  }

  async render(currentPath: string) {
    this.loading(currentPath); // show loader until data load
    const html = await this.getHTML();
    this.canRenderLoadingState = false; // prevent loading state
    const canRender = currentPath === location.pathname;
    if (canRender) {
      document.querySelector(`${MAIN_ELEMENT_SELECTOR}`)!.innerHTML = html;
    }
    Router.postRender();
  }
}
