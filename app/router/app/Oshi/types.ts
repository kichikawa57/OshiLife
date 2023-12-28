import { z } from "zod";

import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";
import { validateEditOshi } from "../../../shared/validate";

export const formData = z.object(validateEditOshi);
export type EditAndDetailParams = { id: string; isEditColor: boolean } & z.infer<typeof formData>;

export type RoutingOfOshi = {
  appOshiTop: undefined;
  appOshiDetail: EditAndDetailParams;
  appOshiEdit: EditAndDetailParams | undefined;
};

export type RoutingPropsOfOshi<K extends keyof RoutingOfOshi> = NavigationProps<RoutingOfOshi, K>;
export type TabBarIconPropsOfOshi = TabBarIconProps<RoutingOfOshi, keyof RoutingOfOshi>;
