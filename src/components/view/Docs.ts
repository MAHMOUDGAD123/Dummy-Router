import AbstractView from "./AbstractView";

export default class extends AbstractView {
  constructor() {
    super("Docs");
  }

  public async getHTML() {
    return `
      <div class='min-h-main [scrollbar-width:none] grid grid-cols-[100%] [grid-auto-rows:100%] [scroll-snap-type:y_mandatory] *:[scroll-snap-align:center] *:[scroll-snap-stop:always] [scroll-behavior:smooth] overflow-auto'>
        <div class='bg-dodgerblue_20'>Docs Page 1</div>
        <div class='bg-dodgerblue_30'>Docs Page 2</div>
        <div class='bg-dodgerblue_80'>Docs Page 3</div>
        <div class='bg-dodgerblue_95'>Docs Page 4</div>
      </div>
    `;
  }
}
