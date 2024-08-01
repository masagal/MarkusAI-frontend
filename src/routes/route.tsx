import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Home } from "../Pages/Home";
import { Inventory } from "../Pages/Inventory";
import { Requests } from "../Pages/Requests";
import { OrderStatus } from "../Pages/OrderStatus";
import { Profile } from "../Pages/Profile";
import { Chat } from "../Pages/Chat";
import { NavBar } from "./NavBar";
import { Users } from "../Pages/users";
import UserNotFoundError from "../Pages/UserNotFoundError";
import { Typography } from "@mui/material";
import ResolveInvitation from "../Pages/ResolveInvitation";

const route = createRootRoute({
  component: NavBar,
  notFoundComponent: () => {
    return (
      <Typography variant="h3" className="mb-8 text-slate-600">
        Page not found!
      </Typography>
    );
  },
});

const home = createRoute({
  getParentRoute: () => route,
  path: "/",
  component: Home,
});

const inventory = createRoute({
  getParentRoute: () => route,
  path: "/inventory",
  component: Inventory,
});
const requests = createRoute({
  getParentRoute: () => route,
  path: "/requests",
  component: Requests,
});
const orderStatus = createRoute({
  getParentRoute: () => route,
  path: "/order-status",
  component: OrderStatus,
});
const profile = createRoute({
  getParentRoute: () => route,
  path: "/profile",
  component: Profile,
});
const chat = createRoute({
  getParentRoute: () => route,
  path: "/chat",
  component: Chat,
});

const errorUserNotFound = createRoute({
  getParentRoute: () => route,
  path: "/error/user-not-found",
  component: UserNotFoundError,
});

const resolveInvitation = createRoute({
  getParentRoute: () => route,
  path: "/invite",
  component: ResolveInvitation,
});

const users = createRoute({
  getParentRoute: () => route,
  path: "/users",
  component: Users,
});

export const routeTree = route.addChildren({
  home,
  inventory,
  requests,
  orderStatus,
  profile,
  chat,
  errorUserNotFound,
  resolveInvitation,
  users
});
