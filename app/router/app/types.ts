import { NavigationProps, TabBarIconProps } from "../../shared/types/router";

import { RoutingOfOshi } from "./Oshi/types";
import { RoutingOfProfile } from "./Profile/types";
import { RoutingOfSchedule } from "./Schedule/types";

export type RoutingOfApp = {
  appSchedule: undefined;
  appOshi: undefined;
  appProfile: undefined;
};

export type AllRoutingOfApp = RoutingOfApp & RoutingOfSchedule & RoutingOfOshi & RoutingOfProfile;

export type RoutingPropsOfApp<K extends keyof RoutingOfApp> = NavigationProps<RoutingOfApp, K>;
export type TabBarIconPropsOfApp = TabBarIconProps<RoutingOfApp, keyof RoutingOfApp>;
