import DummyView from "@/router/DummyView";
import template from "./template.html?raw";

export default class extends DummyView {
  readonly title: string = "Docs";

  constructor() {
    super();
    this.setTitle();
  }

  async getHTML() {
    return template;
  }
}
