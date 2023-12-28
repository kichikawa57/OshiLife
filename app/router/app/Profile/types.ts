import { z } from "zod";

import { NavigationProps, TabBarIconProps } from "../../../shared/types/router";
import { validateEditProfile } from "../../../shared/validate";

export const formData = z.object(validateEditProfile);
export type EditParams = { id: string } & z.infer<typeof formData>;

export type RoutingOfProfile = {
  appProfileTop: undefined;
  appProfileEdit: EditParams;
  appProfileSetting: undefined;
};

export type RoutingPropsOfProfile<K extends keyof RoutingOfProfile> = NavigationProps<
  RoutingOfProfile,
  K
>;
export type TabBarIconPropsOfProfile = TabBarIconProps<RoutingOfProfile, keyof RoutingOfProfile>;
