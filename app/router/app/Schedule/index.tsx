import React from "react";
import type { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RoutingPropsOfApp } from "../types";
import { RoutingPropsOfRoot } from "../../types";
import { Schedule as SchedulePage } from "../../../pages/Schedule";
import { Date } from "../../../pages/Schedule/Date";
import { Detail } from "../../../pages/Schedule/Detail";
import { Edit } from "../../../pages/Schedule/Edit";

import { RoutingOfSchedule } from "./types";

const { Navigator, Screen } = createStackNavigator<RoutingOfSchedule>();

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
};

export const Schedule: FC<Props> = ({ rootRoute, appRoute }) => {
  return (
    <Navigator initialRouteName="top">
      <Screen name="top" options={{ headerShown: false }}>
        {(props) => (
          <SchedulePage rootRoute={rootRoute} appRoute={appRoute} scheduleRoute={props} />
        )}
      </Screen>
      <Screen
        name="date"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <Date rootRoute={rootRoute} appRoute={appRoute} scheduleRoute={props} />}
      </Screen>
      <Screen
        name="detail"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <Detail rootRoute={rootRoute} appRoute={appRoute} scheduleRoute={props} />}
      </Screen>
      <Screen
        name="edit"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <Edit rootRoute={rootRoute} appRoute={appRoute} scheduleRoute={props} />}
      </Screen>
    </Navigator>
  );
};
