import React from "react";
import type { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RoutingPropsOfRoot } from "../../types";
import { RoutingPropsOfApp } from "../types";
import { Oshi as OshiPage } from "../../../pages/Oshi";
import { Detail } from "../../../pages/Oshi/Detail";

import { RoutingOfOshi } from "./types";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
};

const { Navigator, Screen } = createStackNavigator<RoutingOfOshi>();

export const Oshi: FC<Props> = ({ rootRoute, appRoute }) => {
  return (
    <Navigator initialRouteName="top">
      <Screen name="top" options={{ headerTitle: "推し一覧" }}>
        {(props) => <OshiPage rootRoute={rootRoute} appRoute={appRoute} oshiRoute={props} />}
      </Screen>
      <Screen name="detail" options={{ headerTitle: "川村和馬" }}>
        {(props) => <Detail rootRoute={rootRoute} appRoute={appRoute} oshiRoute={props} />}
      </Screen>
    </Navigator>
  );
};
