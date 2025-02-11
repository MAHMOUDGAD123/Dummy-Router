import "@/styles/_index.css";
import "@/styles/fa/css/all.min.css";
import "@/components/link";
import "@/router";
import routerLogo from "/router.svg";

// this is the page layout.
// (main) element is the default element that the AbstractView will use to render the views
// unless you provide a (renderTarget) during the render phase
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header class='w-full h-header flex p-[15px] items-center justify-center'>
    <a-link to="/" class="logo">
      <img src="${routerLogo}" alt="logo"/>
      <span>
        <span class='font-saira'>R</span>
        <i class="fa-solid fa-face-grin-tongue-wink"></i>
        <span class='font-saira'>U</span>
        <span class='font-saira'>T</span>
        <span class='font-saira'>E</span>
        <span class='font-saira'>R</span>
      </span>
    </a-link>
  </header>

  <nav class='h-nav z-[1] max-_md:h-auto max-_md:rounded-[10px] max-_md:text-[0.75rem] max-_md:*:min-w-[45px] max-_md:p-[10px] sticky top-0 rounded-full mx-auto mt-nav w-fit px-[30px] flex flex-wrap items-center justify-center gap-[10px] bg-header *:min-w-[80px]'>
    <nav-link to="/">Home</nav-link>
    <nav-link to="/posts">Posts</nav-link>
    <nav-link to="/users">Users</nav-link>
    <nav-link to="/docs">Docs</nav-link>
  </nav>

  <main id="__main__" class='min-h-main p-[10px]'></main>

  <footer class='flex items-center justify-center gap-[10px] font-saira py-[7px] bg-footer'>
    <span class='font-bold'>Powered by</span>
    <div class='by font-extrabold flex items-center gap-[5px]'>
      <i class="fa-solid fa-bolt-lightning animate-pulse text-dodgerblue"></i>
      <a href='https://vite.dev/' target='_blank'>
        <span class='text-dodgerblue'>Vite</span>
      </a>
      <i class="fa-solid fa-bolt-lightning animate-pulse text-dodgerblue"></i>
    </div>
  </footer>
`;
