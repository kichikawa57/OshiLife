import { z } from "zod";

import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";
import { validateEditOshi } from "../../../shared/validate";

export const formData = z.object(validateEditOshi);
export type EditParams =
  | ({ id: string; isEditColor: boolean } & z.infer<typeof formData>)
  | undefined;

export type RoutingOfOshi = {
  top: undefined;
  detail: undefined;
  edit: EditParams;
};

export type RoutingPropsOfOshi<K extends keyof RoutingOfOshi> = NavigationProps<RoutingOfOshi, K>;
export type TabBarIconPropsOfOshi = TabBarIconProps<RoutingOfOshi, keyof RoutingOfOshi>;
