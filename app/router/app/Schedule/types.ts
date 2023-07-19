import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";

export type ExampleRoute = { itemId: number; otherParam: string } | undefined;

export type RoutingOfSchedule = {
  top: undefined;
  date: undefined;
  detail: undefined;
};

export type RoutingPropsOfSchedule<K extends keyof RoutingOfSchedule> = NavigationProps<
  RoutingOfSchedule,
  K
>;
export type TabBarIconPropsOfSchedule = TabBarIconProps<RoutingOfSchedule, keyof RoutingOfSchedule>;
