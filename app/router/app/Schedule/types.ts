import { z } from "zod";

import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";
import { validateEditSchedule } from "../../../shared/validate";
import { ScheduleId } from "../../../model/schedules";
import { CalendarType } from "../../../shared/types/components/schedules";

export type ExampleRoute = { itemId: number; otherParam: string } | undefined;

export const formData = z.object(validateEditSchedule);
export type Params = {
  id: ScheduleId | null;
  date: string;
  calendarType: CalendarType;
  connectedScheduleId: ScheduleId | null;
} & z.infer<typeof formData>;

export type RoutingOfSchedule = {
  top: undefined;
  date: { date: string; calendarType: CalendarType };
  detail: Params;
  edit: Params;
};

export type RoutingPropsOfSchedule<K extends keyof RoutingOfSchedule> = NavigationProps<
  RoutingOfSchedule,
  K
>;
export type TabBarIconPropsOfSchedule = TabBarIconProps<RoutingOfSchedule, keyof RoutingOfSchedule>;
