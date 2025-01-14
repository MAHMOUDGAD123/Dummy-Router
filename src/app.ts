import "@/styles/_index.css";
import "@/styles/fa/css/all.min.css";
import "@/components/link/NavLink";
import "@/components/link/Link";
import "@/router";
import routerLogo from "/router.svg";
import { MAIN_ELEMENT_SELECTOR } from "@/utils/contants";

// this is the page layout.
// (main) element is the default element that the router will use
// to render the views you can change it to whatever you want
// by changing the name of the (MAIN_ELEMENT_SELECTOR) in the (src/utils/contants) file
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <header class='w-full h-header flex p-[15px] items-center justify-center'>
    <a-link to="/" class="logo">
      <img src="${routerLogo}" alt="logo"/>
      <span>
        <i class="fa-solid fa-r"></i>
        <i class="fa-solid fa-face-grin-tongue-wink dummy"></i>
        <i class="fa-solid fa-u"></i>
        <i class="fa-solid fa-t"></i>
        <i class="fa-solid fa-e"></i>
        <i class="fa-solid fa-r"></i>
      </span>
    </a-link>
  </header>

  <nav class='h-nav rounded-full mx-auto mt-nav w-fit px-[30px] flex items-center justify-center gap-[10px] bg-header'>
    <nav-link to="/">Home</nav-link>
    <nav-link to="/posts">Posts</nav-link>
    <nav-link to="/users">Users</nav-link>
    <nav-link to="/docs">Docs</nav-link>
  </nav>

  <${MAIN_ELEMENT_SELECTOR} class='min-h-main p-[10px]'></${MAIN_ELEMENT_SELECTOR}>

  <footer class='flex items-center justify-center gap-[10px] font-saira py-[7px] bg-footer'>
    <span class='font-bold'>Powered by</span>
    <span class='by font-extrabold flex items-center gap-[5px]'>
      <i class="fa-solid fa-bolt-lightning animate-pulse text-dodgerblue"></i>
      <span class='text-dodgerblue'>Vite</span>
      <i class="fa-solid fa-bolt-lightning animate-pulse text-dodgerblue"></i>
    </span>
  </footer>
`;
