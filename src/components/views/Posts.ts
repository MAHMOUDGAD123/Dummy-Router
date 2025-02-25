import DummyView from "@/router/DummyView";
import Router from "@/router/router";

export default class extends DummyView {
  readonly title: string = "Posts";
  readonly searchParams = Router.useSearchParams();
  readonly renderTargets = {
    postsRT: "posts_rt",
  };

  private readonly filterMap: Map<string, string> = new Map(
    new Array(10).fill(0).map((_, i) => {
      return [`_U${i + 1}_`, `/posts?userid=${i + 1}`];
    })
  );

  constructor() {
    super();
    this.setTitle();
  }

  async overheadWork() {
    const postsFilter = document.getElementById("postsFilter");
    const currentPathQuery = Router.getPathQuery();

    // set the active filter button
    for (const [id, pathQuery] of this.filterMap) {
      const ele = document.getElementById(id) as HTMLInputElement;
      if (currentPathQuery === pathQuery) {
        ele.checked = true;
      } else {
        ele.checked = false;
      }
    }

    postsFilter!.onclick = (e) => {
      const target = e.target as HTMLInputElement;
      const pathQuery = this.filterMap.get(target.id);

      if (pathQuery) {
        const isChecked = target.checked;
        postsFilter!.childNodes.forEach((node) => {
          (node as HTMLInputElement).checked = false;
        });
        Router.navigateTo(
          isChecked ? pathQuery : "/posts",
          this.renderTargets.postsRT
        );
        target.checked = isChecked;
      }
    };
  }

  async getStaticHTML() {
    return `
        <div class="filters" id="postsFilter">
            ${[...this.filterMap.entries()]
              .map(
                ([id], i) =>
                  `<input type="checkbox"
                          name="filter"
                          id="${id}"
                          data-label="user ${i + 1}"
                    />`
              )
              .join("")}
          </div>
    `;
  }

  async getDynamicHTML(props: { [k: string]: any }) {
    const { postsData } = props as { postsData: Info.PostInfoType[] };

    return `
        ${postsData
          .map(
            (postData) => `
                  <a-link to="/posts/[${postData.id}]" class='p-[20px] font-extrabold text-[1.25rem] rounded-3xl bg-dodgerblue_80 hover:bg-dodgerblue text-ellipsis overflow-hidden whitespace-nowrap'>
                    Post ${postData.id}
                  </a-link>
                `
          )
          .join("")}
    `;
  }

  async getHTML(_dynamicOnly: boolean) {
    try {
      const userId = this.searchParams!.get("userid");

      let postsData = (await Router.dummyFetch(
        "https://jsonplaceholder.typicode.com/posts"
      )) as Info.PostInfoType[];

      if (userId && this.filterMap.has(`_U${userId}_`)) {
        postsData = postsData.filter((post) => post.userId === +userId);
      }

      if (_dynamicOnly) {
        return await this.getDynamicHTML({ postsData });
      }

      return `
          ${await this.getStaticHTML()}

          <div id="${
            this.renderTargets.postsRT
          }"  class='flex flex-wrap *:[flex-basis:200px] max-_lg:*:[flex-basis:350px] p-[15px] gap-[20px] justify-center [scrollbar-width:none] overflow-auto'>
            ${await this.getDynamicHTML({ postsData })}
          </div>
        `;
    } catch (err) {
      return await this.error(err as Error);
    }
  }
}
