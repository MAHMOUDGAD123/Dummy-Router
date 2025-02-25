import DummyView from "@/router/DummyView";
import Router from "@/router/router";

export default class extends DummyView {
  readonly params = Router.useParams() as { id: string };
  readonly title: string = `Post - ${this.params.id}`;

  constructor() {
    super();
    this.setTitle();
  }

  async getHTML() {
    try {
      const postId = +this.params.id;
      if (postId < 1 || postId > 100) {
        throw new Error(
          `postId of ${postId} is invalid - posts are in the range of 1->100.`
        );
      }
      const postData = (await Router.dummyFetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      )) as Info.PostInfoType;

      return `
        <div class='flex flex-col p-[30px] gap-[20px] justify-center max-w-[600px] mx-auto my-[30px]'>
          <div class='w-fit aspect-square p-[15px] flex font-saira text-[2.5rem] justify-center items-center rounded-full bg-dodgerblue_30 mx-auto border-[5px] border-solid border-dodgerblue'>${postData.id}</div>
          <h1 class='text-dodgerblue w-fit mx-auto text-[1.5rem] font-extrabold'>${postData.title}</h1>
          <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'>${postData.body}</p>
        </div>`;
    } catch (err) {
      return await this.error(err as Error);
    }
  }
}
