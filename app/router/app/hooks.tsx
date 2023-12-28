import React from "react";

import { Icon } from "../../components/Icon";
import { IconName } from "../../shared/types/components/icon";

import { TabBarIconPropsOfApp } from "./types";

export const useRouter = () => {
  const tabBarIcon: TabBarIconPropsOfApp = (route, { focused }) => {
    let iconName: IconName = "calendar";

    switch (route.name) {
      case "appSchedule":
        iconName = "calendar";
        break;

      case "appOshi":
        iconName = "star";
        break;

      case "appProfile":
        iconName = "user-circle";
        break;
    }

    return <Icon name={iconName} color={focused ? "#000" : "#ccc"} />;
  };

  return { tabBarIcon };
};
