import AbstractView from "@/components/view/AbstractView";
import template from "./template.html?raw";

export default class extends AbstractView {
  readonly title: string = "Docs";

  constructor() {
    super();
    this.setTitle();
  }

  async getHTML() {
    return template;
  }
}
