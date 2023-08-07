import React from "react";
import type { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RoutingPropsOfApp } from "../types";
import { Icon } from "../../../components/Icon";
import { RoutingPropsOfRoot } from "../../types";
import { Schedule as SchedulePage } from "../../../pages/Schedule";
import { Date } from "../../../pages/Schedule/Date";
import { Detail } from "../../../pages/Schedule/Detail";

import { RoutingOfSchedule } from "./types";

const { Navigator, Screen } = createStackNavigator<RoutingOfSchedule>();

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
};

export const Schedule: FC<Props> = ({ rootRoute, appRoute }) => {
  return (
    <Navigator initialRouteName="date">
      <Screen name="top" options={{ headerShown: false }}>
        {(props) => (
          <SchedulePage rootRoute={rootRoute} appRoute={appRoute} scheduleRoute={props} />
        )}
      </Screen>
      <Screen
        name="date"
        options={({ navigation }) => ({
          headerLeft: () => <Icon name="chevron-left" onPress={() => navigation.goBack()} />,
          headerTitle: "2023/01/10",
        })}
      >
        {(props) => <Date rootRoute={rootRoute} appRoute={appRoute} scheduleRoute={props} />}
      </Screen>
      <Screen
        name="detail"
        options={({ navigation }) => ({
          headerLeft: () => <Icon name="chevron-left" onPress={() => navigation.goBack()} />,
          headerTitle: "",
        })}
      >
        {(props) => <Detail rootRoute={rootRoute} appRoute={appRoute} scheduleRoute={props} />}
      </Screen>
    </Navigator>
  );
};
