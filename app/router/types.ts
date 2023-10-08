import { Navigation, NavigationProps, TabBarIconProps, UseRoute } from "../shared/types/router";

export type RoutingOfRoot = {
  app: undefined;
  login: undefined;
  setupUser: undefined;
  setupOshi: undefined;
};

export type RoutingPropsOfRoot<K extends keyof RoutingOfRoot> = NavigationProps<RoutingOfRoot, K>;
export type TabBarIconPropsOfRoot = TabBarIconProps<RoutingOfRoot, keyof RoutingOfRoot>;

export type UseNavigationOfRoot = Navigation<RoutingOfRoot>;

export type UseRouteOfRoot = UseRoute<RoutingOfRoot>;
