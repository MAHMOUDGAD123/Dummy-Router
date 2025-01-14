import AbstractLink from "./AbstractLink";

export default class NavLink extends AbstractLink {
  constructor() {
    super("nav-link");
  }
}

window.customElements.define("nav-link", NavLink);
