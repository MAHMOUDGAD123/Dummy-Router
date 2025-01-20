export default class AbstractLink extends HTMLElement {
  constructor(private readonly type: "link" | "nav-link") {
    super();
    const href = this.getAttribute("to")!;
    const parent = this.parentElement!;
    const children = this.innerHTML;
    const replace = this.getAttribute("replace") !== null ? "replace" : "";
    const strictActive =
      this.getAttribute("strict-active") !== null ? "strict-active" : "";
    const className = this.getAttribute("class");
    const ID = crypto.randomUUID().split("-")[0];
    const linkData =
      this.type === "nav-link"
        ? `data-link='${ID}' data-nav`
        : `data-link='${ID}'`;
    this.outerHTML = `<a href='${href}' ${replace} ${linkData} ${strictActive}></a>`;
    const linkEle = parent.querySelector(
      `[data-link='${ID}']`
    )! as HTMLAnchorElement;
    if (className) {
      linkEle.setAttribute("class", className);
    }
    linkEle.setAttribute("data-link", "");
    linkEle.innerHTML = children;
  }
}
