import Router from "@/router/router";
import User from "@/components/view/User";

export default class extends User {
  readonly title: string = `User - ${this.params.userId} - posts`;

  constructor() {
    super();
    this.setTitle();
  }

  async getDynamicHTML(props: {
    userId: number;
    userData: Info.UserInfoType;
    postsData: Info.PostInfoType[];
  }) {
    const { userId, userData, postsData } = props;

    return `
        <span class='text-[5rem] font-saira opacity-30'>#${userData.id}</span>

        <div class='w-[100px] aspect-square flex font-saira justify-center items-center rounded-full bg-dodgerblue_30 mx-auto border-[7px] border-solid border-dodgerblue'>
          <i class="fa-solid fa-circle-user text-dodgerblue text-[4.5rem]"></i>
        </div>

        <h1 class='text-dodgerblue font-saira w-fit mx-auto text-[2.5rem] max-_md:text-[1.5rem] font-extrabold'>${
          userData.username
        } Posts</h1>
      
        <div class='flex flex-wrap *:[flex-basis:200px] max-_lg:*:[flex-basis:350px] p-[30px] gap-[20px] justify-center'>
        ${postsData
          .filter((post) => post.userId === userId)
          .map(
            (_, i) => `
                <a-link to="/users/[${userId}]/posts/[${
              i + 1
            }]" render-target='${
              this.renderTargets.userRT
            }'  class='p-[20px] font-extrabold text-[1.25rem] rounded-3xl bg-dodgerblue_80 hover:bg-dodgerblue text-ellipsis overflow-hidden whitespace-nowrap'>
                  Post ${i + 1}
                </a-link>
            `
          )
          .join("")}
    `;
  }

  async getHTML(_dynamicOnly: boolean) {
    try {
      const userId = +this.params.userId;
      if (userId < 1 || userId > 10) {
        throw new Error(
          `userId of ${userId} is invalid - max users count is 10.`
        );
      }
      const [userData, postsData] = await (Promise.all([
        Router.dummyFetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          {
            cacheTarget: `/users/[${userId}]`,
          }
        ),
        Router.dummyFetch("https://jsonplaceholder.typicode.com/posts", {
          cacheTarget: "/posts",
        }),
      ]).then((values) => [values[0], values[1]]) as Promise<
        [Info.UserInfoType, Info.PostInfoType[]]
      >);

      if (_dynamicOnly) {
        return await this.getDynamicHTML({ userId, userData, postsData });
      }

      return `
        <div class='flex flex-col p-[30px] gap-[50px] justify-center max-w-[600px] mx-auto my-[30px]'>
          ${await this.getStaticHTML({ userId: this.params.userId })}

          <div id='${
            this.renderTargets.userRT
          }' class='flex flex-col gap-[20px]'>
            ${await this.getDynamicHTML({ userId, userData, postsData })}
          </div>
        </div>`;
    } catch (err) {
      return await this.error(err as Error);
    }
  }
}
