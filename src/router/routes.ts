import Docs from "@/components/view/Docs";
import Home from "@/components/view/Home";
import Post from "@/components/view/Post";
import Posts from "@/components/view/Posts";
import User from "@/components/view/User";
import Users from "@/components/view/Users";

const ROUTES: Router.Route[] = [
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
];

export default ROUTES;
