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

  public async error(err: Error) {
    return `
      <div class='flex flex-col gap-[15px] my-[70px]'>
        <i class="fa-solid fa-face-frown text-[5rem]"></i>
        <h1 class='text-[1.5rem] font-extrabold'>Sad Dummy</h1>
        <p>${err.message}</p>
      </div>
    `;
  }

  public async render() {
    document.querySelector(`${MAIN_ELEMENT_SELECTOR}`)!.innerHTML =
      await this.getHTML();
  }
}
