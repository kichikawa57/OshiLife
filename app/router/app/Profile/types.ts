import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";

export type RoutingOfProfile = {
  top: undefined;
};

export type RoutingPropsOfProfile<K extends keyof RoutingOfProfile> = NavigationProps<
  RoutingOfProfile,
  K
>;
export type TabBarIconPropsOfProfile = TabBarIconProps<RoutingOfProfile, keyof RoutingOfProfile>;
