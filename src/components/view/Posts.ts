import { waitFor } from "@/utils/tools";
import AbstractView from "./AbstractView";
import { FAKE_LOADING_MAX } from "@/utils/contants";

export default class extends AbstractView {
  constructor() {
    super("Posts");
  }

  public async getHTML() {
    try {
      const postsData = (await fetch("/db/posts.json").then((res) =>
        res.json()
      )) as Info.PostInfoType[];

      // fake server await
      await waitFor(FAKE_LOADING_MAX);

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
