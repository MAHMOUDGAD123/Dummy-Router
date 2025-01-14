import { MAIN_ELEMENT_SELECTOR } from "@/utils/contants";

export default class AbstractView implements View.AbstractViewType {
  constructor(title?: string) {
    if (title) this.setTitle(title);
  }

  setTitle(title: string) {
    document.title = title;
  }

  public async getHTML() {
    return "";
  }

  public async loading() {
    document.querySelector(`${MAIN_ELEMENT_SELECTOR}`)!.innerHTML = `
      <div class='w-full mt-[120px] flex items-center justify-center'>
        <div class='w-[50px] aspect-square border-[5px] border-solid border-x-dodgerblue border-y-transparent rounded-full animate-spin'></div>
      </div>
    `;
  }

  public async error(err: Error) {
    return `
      <div class='flex flex-col gap-[15px] my-[70px]'>
        <i class="fa-solid fa-face-frown text-[5rem]"></i>
        <h1 class='text-[1.5rem] font-extrabold'>Sad Dummy</h1>
        ${
          import.meta.env.DEV
            ? `<p>${err.message}</p>`
            : "<p>Sorry, no data</p>"
        }
      </div>
    `;
  }

  public async render(currentPath: string) {
    this.loading(); // show loader until data load
    const html = await this.getHTML();
    const canRender = currentPath === location.pathname;
    if (canRender) {
      document.querySelector(`${MAIN_ELEMENT_SELECTOR}`)!.innerHTML = html;
    }
  }
}
