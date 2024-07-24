import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Home } from "../Pages/Home";
import { Inventory } from "../Pages/Inventory";
import { Requests } from "../Pages/Requests";
import { OrderStatus } from "../Pages/OrderStatus";
import { Profile } from "../Pages/Profile";
import { About } from "../Pages/About";
import { Chat } from "../Pages/Chat";
import { NavBar } from "./NavBar";

const route = createRootRoute({
  component: NavBar,
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
const about = createRoute({
  getParentRoute: () => route,
  path: "/about",
  component: About,
});
const chat = createRoute({
  getParentRoute: () => route,
  path: "/chat",
  component: Chat,
});

export const routeTree = route.addChildren({
  home,
  inventory,
  requests,
  orderStatus,
  profile,
  about,
  chat,
});
