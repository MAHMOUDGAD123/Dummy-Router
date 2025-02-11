import AbstractView from "@/components/view/AbstractView";
import template from "./template.html?raw";

export default class extends AbstractView {
  readonly title: string = "Home";

  constructor() {
    super();
    this.setTitle();
  }

  public async getHTML() {
    return template;
  }
}
