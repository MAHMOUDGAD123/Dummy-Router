import { waitFor } from "@/utils/tools";
import AbstractView from "./AbstractView";
import Router from "@/router/router";
import { FAKE_LOADING_MAX } from "@/utils/contants";

export default class extends AbstractView {
  private params = Router.useParams() as { id: string };
  private title: string = `User - ${this.params.id}`;

  constructor() {
    super();
    this.setTitle(this.title);
  }

  public async getHTML() {
    try {
      const userData = (
        (await fetch("/db/users.json").then((res) =>
          res.json()
        )) as Info.UserInfoType[]
      )[+this.params.id - 1];

      // fake server await
      await waitFor(FAKE_LOADING_MAX);

      return `
        <div class='flex flex-col p-[30px] gap-[20px] justify-center max-w-[600px] mx-auto my-[30px]'>
          <span class='text-[100px] font-saira top-[200px] left-[20px] z-[-1] opacity-30'>#${userData.id}</span>
          <div class='w-[100px] aspect-square flex font-saira justify-center items-center rounded-full bg-dodgerblue_30 mx-auto border-[7px] border-solid border-dodgerblue'>
            <i class="fa-solid fa-circle-user text-dodgerblue text-[4.5rem]"></i>
          </div>
          <h1 class='text-dodgerblue font-saira w-fit mx-auto text-[2.5rem] font-extrabold'>${userData.username}</h1>
          <div class='flex flex-col gap-[20px] text-start'>
            <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'><span class='text-dodgerblue font-extrabold'>Name:</span> ${userData.name}</p>
            <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'><span class='text-dodgerblue font-extrabold'>Phone:</span> ${userData.phone}</p>
            <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'><span class='text-dodgerblue font-extrabold'>Email:</span> ${userData.email}</p>
            <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'><span class='text-dodgerblue font-extrabold'>Website:</span> ${userData.website}</p>
            <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'><span class='text-dodgerblue font-extrabold'>Company:</span> ${userData.company.name}</p>
            <p class='opacity-85 bg-dodgerblue_30 p-[20px] rounded-2xl'><span class='text-dodgerblue font-extrabold'>Address:</span> ${userData.address.city} - ${userData.address.street} - ${userData.address.suite}</p>
          </div>
        </div>`;
    } catch (err) {
      return await this.error(err as Error);
    }
  }
}
