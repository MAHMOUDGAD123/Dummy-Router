import Router from "@/router/router";
import User from "@/components/views/User";

export default class extends User {
  readonly params = Router.useParams() as {
    userId: string;
    postId: string;
  };
  readonly title: string = `Post - ${this.params.userId} / ${this.params.postId}`;

  constructor() {
    super();
    this.setTitle();
  }

  async getDynamicHTML(props: { postData: Info.PostInfoType }) {
    const { postData } = props;

    return `
        <div class='w-fit aspect-square p-[15px] flex font-saira text-[2.5rem] justify-center items-center rounded-full bg-dodgerblue_30 mx-auto border-[5px] border-solid border-dodgerblue'>${postData.id}</div>
        <h1 class='text-dodgerblue w-fit mx-auto text-[1.5rem] font-extrabold'>${postData.title}</h1>
        <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'>${postData.body}</p>
    `;
  }

  async getHTML(_dynamicOnly: boolean) {
    try {
      const userId = +this.params.userId;
      const postId = +this.params.postId;
      if (postId < 1 || postId > 10) {
        throw new Error(
          `postId of ${postId} is invalid - any user has 1->10 posts.`
        );
      }
      if (userId < 1 || userId > 10) {
        throw new Error(
          `userId of ${userId} is invalid - max users count is 10.`
        );
      }
      const actualPostId = (userId - 1) * 10 + postId;
      const postData = (await Router.dummyFetch(
        `https://jsonplaceholder.typicode.com/posts/${actualPostId}`,
        {
          cacheTarget: `/posts/[${actualPostId}]`,
        }
      )) as Info.PostInfoType;

      if (_dynamicOnly) {
        return await this.getDynamicHTML({ postData });
      }

      return `
        <div class='flex flex-col p-[30px] gap-[50px] justify-center max-w-[600px] mx-auto my-[30px]'>
          ${await this.getStaticHTML({ userId: this.params.userId })}

          <div id='${
            this.renderTargets.userRT
          }' class='flex flex-col gap-[20px]'>
            ${await this.getDynamicHTML({ postData })}
          </div>
        </div>
      `;
    } catch (err) {
      return await this.error(err as Error);
    }
  }
}
