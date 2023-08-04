import React from "react";
import type { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RoutingPropsOfRoot } from "../types";

import { RoutingOfApp } from "./types";
import { useRouter } from "./hooks";
import { Schedule } from "./Schedule";
import { Oshi } from "./Oshi";
import { Profile } from "./Profile";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
};

const Tab = createBottomTabNavigator<RoutingOfApp>();

export const App: FC<Props> = ({ rootRoute }) => {
  const { tabBarIcon } = useRouter();

  return (
    <Tab.Navigator
      initialRouteName="profile"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: (props) => tabBarIcon(route, props),
      })}
    >
      <Tab.Screen name="schedule">
        {(props) => <Schedule rootRoute={rootRoute} appRoute={props} />}
      </Tab.Screen>
      <Tab.Screen name="oshi">
        {(props) => <Oshi rootRoute={rootRoute} appRoute={props} />}
      </Tab.Screen>
      <Tab.Screen name="profile">
        {(props) => <Profile rootRoute={rootRoute} appRoute={props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
