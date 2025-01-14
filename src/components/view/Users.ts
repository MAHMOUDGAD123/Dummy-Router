import { waitFor } from "@/utils/tools";
import AbstractView from "./AbstractView";
import { FAKE_LOADING_MAX } from "@/utils/contants";

export default class extends AbstractView {
  constructor() {
    super("Users");
  }

  public async getHTML() {
    try {
      const usersData = (await fetch("/db/users.json").then((res) =>
        res.json()
      )) as Info.UserInfoType[];

      // fake server await
      await waitFor(FAKE_LOADING_MAX);

      return `
        <div class='flex flex-wrap *:[flex-basis:150px] p-[30px] gap-[20px] justify-center'>
          ${usersData
            .map(
              (userData) => `
                  <a-link to="/users/[${userData.id}]" class='p-[20px] font-extrabold text-[1.25rem] rounded-3xl bg-dodgerblue_80 hover:bg-dodgerblue'>
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
