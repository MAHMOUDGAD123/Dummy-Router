import AbstractView from "./AbstractView";

export default class extends AbstractView {
  constructor() {
    super("Docs");
  }

  public async getHTML() {
    return `
        <h1>Docs Page</h1>
    `;
  }
}
