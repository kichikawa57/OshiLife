import React from "react";

import { Icon } from "../../components/Icon";
import { IconName } from "../../shared/types/components/icon";

import { TabBarIconPropsOfApp } from "./types";

export const useRouter = () => {
  const tabBarIcon: TabBarIconPropsOfApp = (route, { focused }) => {
    let iconName: IconName = "calendar";

    switch (route.name) {
      case "schedule":
        iconName = "calendar";
        break;

      case "oshi":
        iconName = "star";
        break;

      case "profile":
        iconName = "user-circle";
        break;
    }

    return <Icon name={iconName} color={focused ? "#000" : "#ccc"} />;
  };

  return { tabBarIcon };
};
