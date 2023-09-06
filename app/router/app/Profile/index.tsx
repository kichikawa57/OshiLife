import React from "react";
import type { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RoutingPropsOfRoot } from "../../types";
import { RoutingPropsOfApp } from "../types";
import { Profile as ProfilePage } from "../../../pages/Profile";
import { Header } from "../../../components/Header/Normal";

import { RoutingOfProfile } from "./types";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"profile">;
};

const { Navigator, Screen } = createStackNavigator<RoutingOfProfile>();

export const Profile: FC<Props> = ({ rootRoute, appRoute }) => {
  return (
    <Navigator
      initialRouteName="top"
      screenOptions={{
        header: () => <Header title={"プロフィール"} />,
      }}
    >
      <Screen name="top" options={{ headerTitle: "プロフィール" }}>
        {(props) => <ProfilePage rootRoute={rootRoute} appRoute={appRoute} profileRoute={props} />}
      </Screen>
    </Navigator>
  );
};
