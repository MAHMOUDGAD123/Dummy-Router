import AbstractView from "@/components/view/AbstractView";
import template from "./template.html?raw";

export default class extends AbstractView {
  constructor() {
    super("Docs");
  }

  public async getHTML() {
    return template;
  }
}
