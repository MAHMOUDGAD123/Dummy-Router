import NotFound from "@/router/DummyNotFoundView";
import Docs from "@/components/views/Docs";
import Home from "@/components/views/Home";
import Post from "@/components/views/Post";
import Posts from "@/components/views/Posts";
import User from "@/components/views/User";
import UserPosts from "@/components/views/UserPosts";
import Users from "@/components/views/Users";
import UserPost from "@/components/views/UserPost";

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
      path: "/users/[userId]",
      view: User,
      name: "Users Info",
    },
    {
      path: "/users/[userId]/posts",
      view: UserPosts,
      name: "User Posts",
    },
    {
      path: "/users/[userId]/posts/[postId]",
      view: UserPost,
      name: "User Post",
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
