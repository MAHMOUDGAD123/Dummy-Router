import Docs from "@/components/view/Docs";
import Home from "@/components/view/Home";
import NotFound from "@/components/view/NotFound";
import Post from "@/components/view/Post";
import Posts from "@/components/view/Posts";
import User from "@/components/view/User";
import Users from "@/components/view/Users";

const ROUTES: Router.Routes = {
  data: [
    {
      path: "/",
      view: Home,
      name: "Home",
    },
    {
      path: "/posts",
      view: Posts,
      name: "Posts",
    },
    {
      path: "/posts/[id]",
      view: Post,
      name: "Post",
    },
    {
      path: "/users",
      view: Users,
      name: "Users",
    },
    {
      path: "/users/[id]",
      view: User,
      name: "Users",
    },
    {
      path: "/docs",
      view: Docs,
      name: "Docs",
    },
  ],
  notFoundView: NotFound, // needed to provide the not found case
} satisfies Router.Routes;

export default ROUTES;
