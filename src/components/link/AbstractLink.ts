export default class AbstractLink extends HTMLElement {
  protected readonly linkEle: HTMLAnchorElement;
  protected readonly href: string;
  protected readonly replace: boolean = this.getAttribute("replace") !== null;

  constructor(private readonly type: "link" | "nav-link") {
    super();
    this.href = this.getAttribute("to")!;
    const parent = this.parentElement!;
    const children = this.innerHTML;
    const replace = this.replace ? "replace" : "";
    const ID = crypto.randomUUID().split("-")[0];
    const linkData =
      this.type === "nav-link"
        ? `data-link='${ID}' data-nav`
        : `data-link='${ID}'`;
    this.outerHTML = `<a class='${this.className}' href='${this.href}' ${replace} ${linkData}></a>`;
    this.linkEle = parent.querySelector(
      `[data-link='${ID}']`
    )! as HTMLAnchorElement;
    this.linkEle.setAttribute("data-link", "");
    this.linkEle.setAttribute("data-link", "");
    this.linkEle.innerHTML = children;
  }
}
