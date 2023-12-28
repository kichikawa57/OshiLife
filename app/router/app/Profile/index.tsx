import React from "react";
import type { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RoutingPropsOfRoot } from "../../types";
import { RoutingPropsOfApp } from "../types";
import { Profile as ProfilePage } from "../../../pages/Profile";
import { Header } from "../../../components/Header/Normal";
import { Edit } from "../../../pages/Profile/Edit";
import { Setting } from "../../../pages/Profile/Setting";

import { RoutingOfProfile } from "./types";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"appProfile">;
};

const { Navigator, Screen } = createStackNavigator<RoutingOfProfile>();

export const Profile: FC<Props> = ({ rootRoute, appRoute }) => {
  return (
    <Navigator
      initialRouteName="appProfileTop"
      screenOptions={{
        header: () => <Header title={"プロフィール"} />,
      }}
    >
      <Screen name="appProfileTop" options={{ headerShown: false }}>
        {(props) => <ProfilePage rootRoute={rootRoute} appRoute={appRoute} profileRoute={props} />}
      </Screen>
      <Screen name="appProfileEdit" options={{ headerShown: false }}>
        {(props) => <Edit rootRoute={rootRoute} appRoute={appRoute} profileRoute={props} />}
      </Screen>
      <Screen name="appProfileSetting" options={{ headerShown: false }}>
        {(props) => <Setting rootRoute={rootRoute} appRoute={appRoute} profileRoute={props} />}
      </Screen>
    </Navigator>
  );
};
