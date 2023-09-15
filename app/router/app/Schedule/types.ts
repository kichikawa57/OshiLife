import { z } from "zod";

import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";
import { validateEditSchedule } from "../../../shared/validate";
export type ExampleRoute = { itemId: number; otherParam: string } | undefined;

export const formData = z.object(validateEditSchedule);
export type EditParams = ({ id: string } & z.infer<typeof formData>) | undefined;

export type RoutingOfSchedule = {
  top: undefined;
  date: undefined;
  detail: undefined;
  edit: EditParams;
};

export type RoutingPropsOfSchedule<K extends keyof RoutingOfSchedule> = NavigationProps<
  RoutingOfSchedule,
  K
>;
export type TabBarIconPropsOfSchedule = TabBarIconProps<RoutingOfSchedule, keyof RoutingOfSchedule>;
