import AbstractView from "./AbstractView";
import Router from "@/router/router";

export default class extends AbstractView {
  readonly title: string = "404";

  constructor() {
    super();
    this.setTitle();
  }

  public async getHTML() {
    return `
        <div class='flex flex-col gap-[15px] my-[70px]'>
        <i class="fa-solid fa-face-frown text-[5rem]"></i>
        <h1 class='text-[1.75rem] font-extrabold font-saira'>Sad Dummy</h1>
        <p>Sorry, <span class='text-dodgerblue'>${Router.currentPath}</span> route doesn't exist</p>
      </div>
    `;
  }
}
