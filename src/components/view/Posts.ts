import AbstractView from "@/components/view/AbstractView";
import Router from "@/router/router";

export default class extends AbstractView {
  constructor() {
    super("Posts");
  }

  public async getHTML() {
    try {
      const postsData = (await Router.dummyFetch(
        "https://jsonplaceholder.typicode.com/posts"
      )) as Info.PostInfoType[];

      return `
        <div class='flex flex-wrap *:[flex-basis:200px] max-_lg:*:[flex-basis:350px] p-[30px] gap-[20px] justify-center'>
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
