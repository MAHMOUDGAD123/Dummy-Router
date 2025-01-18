import NotFound from "@/components/view/NotFound";
import Docs from "@/components/view/Docs";
import Home from "@/components/view/Home";
import Post from "@/components/view/Post";
import Posts from "@/components/view/Posts";
import User from "@/components/view/User";
import UserPosts from "@/components/view/UserPosts";
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
      name: "Users Info",
    },
    {
      path: "/users/[id]/posts",
      view: UserPosts,
      name: "User Posts",
    },
    {
      path: "/docs",
      view: Docs,
      name: "Docs",
    },
  ],
  notFound: NotFound,
};

export default ROUTES;
