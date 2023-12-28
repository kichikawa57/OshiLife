import React from "react";
import type { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RoutingPropsOfRoot } from "../../types";
import { RoutingPropsOfApp } from "../types";
import { Oshi as OshiPage } from "../../../pages/Oshi";
import { Detail } from "../../../pages/Oshi/Detail";
import { Header } from "../../../components/Header/Normal";
import { Edit } from "../../../pages/Oshi/Edit";

import { RoutingOfOshi } from "./types";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"appOshi">;
};

const { Navigator, Screen } = createStackNavigator<RoutingOfOshi>();

export const Oshi: FC<Props> = ({ rootRoute, appRoute }) => {
  return (
    <Navigator initialRouteName="appOshiTop">
      <Screen name="appOshiTop" options={{ header: () => <Header title={"推し一覧"} /> }}>
        {(props) => <OshiPage rootRoute={rootRoute} appRoute={appRoute} oshiRoute={props} />}
      </Screen>
      <Screen name="appOshiEdit" options={{ headerShown: false }}>
        {(props) => <Edit rootRoute={rootRoute} appRoute={appRoute} oshiRoute={props} />}
      </Screen>
      <Screen name="appOshiDetail" options={{ headerShown: false }}>
        {(props) => <Detail rootRoute={rootRoute} appRoute={appRoute} oshiRoute={props} />}
      </Screen>
    </Navigator>
  );
};
