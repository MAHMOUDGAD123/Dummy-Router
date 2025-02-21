import AbstractView from "@/components/view/AbstractView";
import Router from "@/router/router";

export default class extends AbstractView {
  readonly title: string = "Posts";

  constructor() {
    super();
    this.setTitle();
  }

  async getHTML() {
    try {
      const postsData = (await Router.dummyFetch(
        "https://jsonplaceholder.typicode.com/posts"
      )) as Info.PostInfoType[];

      return `
        <div class='flex flex-wrap *:[flex-basis:200px] max-_lg:*:[flex-basis:350px] p-[15px] gap-[20px] justify-center *:[content-visibility:auto] max-h-[500px] mt-[30px] [scrollbar-width:none] overflow-auto'>
          ${postsData
            .map(
              (postData) => `
                  <a-link to="/posts/[${postData.id}]" class='p-[20px] font-extrabold text-[1.25rem] rounded-3xl bg-dodgerblue_80 hover:bg-dodgerblue text-ellipsis overflow-hidden whitespace-nowrap'>
                    Post ${postData.id}
                  </a-link>
              `
            )
            .join("")}
        </div>`;
    } catch (err) {
      return await this.error(err as Error);
    }
  }
}
