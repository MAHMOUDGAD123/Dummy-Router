import AbstractView from "@/components/view/AbstractView";
import Router from "@/router/router";

export default class extends AbstractView {
  private params = Router.useParams() as { id: string };
  private title: string = `User - ${this.params.id} - posts`;

  constructor() {
    super();
    this.setTitle(this.title);
  }

  public async getHTML() {
    try {
      const { id } = this.params;
      const [userData, postsData] = await (Promise.all([
        Router.dummyFetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          cacheTarget: `/users/[${id}]`,
        }),
        Router.dummyFetch("https://jsonplaceholder.typicode.com/posts", {
          cacheTarget: "/posts",
        }),
      ]).then((values) => [values[0], values[1]]) as Promise<
        [Info.UserInfoType, Info.PostInfoType[]]
      >);

      return `
        <div class='flex flex-col p-[30px] gap-[20px] justify-center max-w-[600px] mx-auto my-[30px]'>
          <div>
            <nav-link to="/users/[${id}]" strict-active class='border-[2px] border-solid border-dodgerblue'>info</nav-link>
            <nav-link to="/users/[${id}]/posts" strict-active class='border-[2px] border-solid border-dodgerblue'>posts</nav-link>
          </div>

          <span class='text-[5rem] font-saira opacity-30'>#${userData.id}</span>

          <div class='w-[100px] aspect-square flex font-saira justify-center items-center rounded-full bg-dodgerblue_30 mx-auto border-[7px] border-solid border-dodgerblue'>
            <i class="fa-solid fa-circle-user text-dodgerblue text-[4.5rem]"></i>
          </div>

          <h1 class='text-dodgerblue font-saira w-fit mx-auto text-[2.5rem] max-_md:text-[1.5rem] font-extrabold'>${
            userData.username
          } Posts</h1>
          
          <div class='flex flex-wrap *:[flex-basis:200px] max-_lg:*:[flex-basis:350px] p-[30px] gap-[20px] justify-center'>
          ${postsData
            .filter((post) => post.userId === +id)
            .map(
              (postData, i) => `
                  <a-link to="/posts/[${
                    postData.id
                  }]" class='p-[20px] font-extrabold text-[1.25rem] rounded-3xl bg-dodgerblue_80 hover:bg-dodgerblue text-ellipsis overflow-hidden whitespace-nowrap'>
                    Post ${i + 1}
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
