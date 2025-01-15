// import "@/styles/home.css";
import AbstractView from "./AbstractView";

export default class extends AbstractView {
  constructor() {
    super("Home");
  }

  public async getHTML() {
    return `
    <div class='my-[70px] max-w-[700px] mx-auto flex flex-col gap-[30px] *:mx-auto'>
      <h1 class='font-saira text-[3rem] mb-[20px]'>
        <span>Welcome to</span>
        <span class='text-dodgerblue'>Dummy Router</span>
      </h1>

      <p class='text-[1.25rem] font-bold px-[20px]'>
        This is a dumdum client-side router built by plain 
        <span class='text-dodgerblue font-extrabold'>Javascript</span> 
        and native browser APIs it supports fast dynamic routing
        using the (<span class='text-dodgerblue'>Dummy Algorithm</span>).
      </p>

      <p class='opacity-70 margin max-w-[400px] text-[0.85rem] font-bold mb-[20px]'>
        <i class="fa-solid fa-triangle-exclamation"></i>
        This Router was built in a couple of days so don't
        use it in production directly first you need to test it, customize it, 
        do what ever you want before using it, or don't use it at all.
      </p>

      <a-link to="/docs" class='w-fit [&:hover_i]:animate-pulse'>
        <button>
          <span>Go to Docs</span>
          <i class="fa-solid fa-circle-arrow-right"></i>
        </button>
      </a-link>
    </div>
    `;
  }
}
