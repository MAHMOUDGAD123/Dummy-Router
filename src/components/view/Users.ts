import AbstractView from "@/components/view/AbstractView";
import Router from "@/router/router";

export default class extends AbstractView {
  readonly title: string = "Users";

  constructor() {
    super();
    this.setTitle();
  }

  async getHTML() {
    try {
      const usersData = (await Router.dummyFetch(
        "https://jsonplaceholder.typicode.com/users"
      )) as Info.UserInfoType[];

      return `
        <div class='flex flex-wrap *:[flex-basis:200px] max-_lg:*:[flex-basis:350px] p-[30px] gap-[20px] justify-center'>
          ${usersData
            .map(
              (userData) => `
                  <a-link to="/users/[${userData.id}]" class='p-[20px] font-extrabold text-[1.25rem] rounded-3xl bg-dodgerblue_80 hover:bg-dodgerblue text-ellipsis overflow-hidden whitespace-nowrap'>
                    User ${userData.id}
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
