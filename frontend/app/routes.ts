import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  {
    path: "register",
    file: "routes/register.tsx",
  },
  {
    path: "*",
    file: "routes/error_page.tsx", 
  },
  {
    path: "posts",
    file: "routes/posts.tsx", 
  },
] satisfies RouteConfig;
