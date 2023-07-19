import { NavigationProps, TabBarIconProps } from "../../shared/types/router";

export type RoutingOfApp = {
  schedule: undefined;
  oshi: undefined;
  profile: undefined;
};

export type RoutingPropsOfApp<K extends keyof RoutingOfApp> = NavigationProps<RoutingOfApp, K>;
export type TabBarIconPropsOfApp = TabBarIconProps<RoutingOfApp, keyof RoutingOfApp>;
