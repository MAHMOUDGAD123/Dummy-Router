import AbstractView from "@/components/view/AbstractView";
import Router from "@/router/router";

export default class extends AbstractView {
  private params = Router.useParams() as { id: string };
  private title: string = `User - ${this.params.id}`;

  constructor() {
    super();
    this.setTitle(this.title);
  }

  public async getHTML() {
    try {
      const { id } = this.params;
      const userData = (await Router.dummyFetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      )) as Info.UserInfoType;

      return `
        <div class='flex flex-col p-[30px] gap-[20px] justify-center max-w-[600px] mx-auto my-[30px]'>
          <div class='*:transition-colors'>
            <nav-link to="/users/[${id}]" strict-active class='border-[2px] border-solid border-dodgerblue'>info</nav-link>
            <nav-link to="/users/[${id}]/posts" strict-active class='border-[2px] border-solid border-dodgerblue'>posts</nav-link>
          </div>

          <span class='text-[5rem] font-saira opacity-30'>#${userData.id}</span>

          <div class='w-[100px] aspect-square flex font-saira justify-center items-center rounded-full bg-dodgerblue_30 mx-auto border-[7px] border-solid border-dodgerblue'>
            <i class="fa-solid fa-circle-user text-dodgerblue text-[4.5rem]"></i>
          </div>

          <h1 class='text-dodgerblue font-saira w-fit mx-auto text-[2.5rem] max-_md:text-[1.5rem] font-extrabold'>${userData.username}</h1>
          
          <div class='flex flex-col gap-[20px] text-start *:break-words'>
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
