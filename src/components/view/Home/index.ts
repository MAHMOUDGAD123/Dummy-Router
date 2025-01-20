import AbstractView from "@/components/view/AbstractView";
import template from "./template.html?raw";

export default class extends AbstractView {
  constructor() {
    super("Home");
  }

  public async getHTML() {
    return template;
  }
}
