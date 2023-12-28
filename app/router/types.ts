import { Navigation, NavigationProps, TabBarIconProps, UseRoute } from "../shared/types/router";

import { AllRoutingOfApp } from "./app/types";

export type RoutingOfRoot = {
  app: undefined;
  login: undefined;
  setupUser: undefined;
  setupOshi: undefined;
};

export type RoutingPropsOfRoot<K extends keyof RoutingOfRoot> = NavigationProps<RoutingOfRoot, K>;
export type TabBarIconPropsOfRoot = TabBarIconProps<RoutingOfRoot, keyof RoutingOfRoot>;

type AllRouting = RoutingOfRoot & AllRoutingOfApp;
export type UseNavigationOfRoot = Navigation<AllRouting>;

export type UseRouteOfRoot = UseRoute<RoutingOfRoot>;
