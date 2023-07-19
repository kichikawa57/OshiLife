import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";

export type ExampleRoute = { itemId: number; otherParam: string } | undefined;

export type RoutingOfOshi = {
  top: undefined;
  detail: undefined;
};

export type RoutingPropsOfOshi<K extends keyof RoutingOfOshi> = NavigationProps<RoutingOfOshi, K>;
export type TabBarIconPropsOfOshi = TabBarIconProps<RoutingOfOshi, keyof RoutingOfOshi>;
