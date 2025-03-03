import DummyView from "@/router/DummyView";
import template from "./template.html?raw";

export default class extends DummyView {
  readonly title: string = "Docs";

  constructor() {
    super();
    this.setTitle();
  }

  async overheadWork(): Promise<void> {
    document.getElementById("docs")!.onscrollend = (e) => {
      const docsEle = e.currentTarget as HTMLDivElement;
      const gapValue = 3; // px
      const btt = document.getElementById("docs-btt")!;
      const h = Math.ceil(docsEle.getBoundingClientRect().height) + gapValue;
      const scrollTop = Math.ceil(docsEle.scrollTop);
      const show = scrollTop > h + gapValue;
      btt.style.visibility = `${show ? "visible" : "hidden"}`;
    };

    document.getElementById("docs-btt")!.onclick = () => {
      document.getElementById("docs")!.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  async getHTML() {
    return template;
  }
}
