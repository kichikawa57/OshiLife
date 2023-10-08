import "react-native-url-polyfill/auto";

import React from "react";
import type { FC } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import dayjs from "dayjs";
import { NativeModules } from "react-native";

import { Login } from "../pages/Login";
import { SetupOshi } from "../pages/SetupOshi";
import { SetupUser } from "../pages/SetupUser";

import { Wrapper } from "./helper/Wrapper";
import { RoutingOfRoot } from "./types";
import { App } from "./app";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Stack = createStackNavigator<RoutingOfRoot>();

if (__DEV__) {
  NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

export const Router: FC = () => {
  return (
    <Wrapper>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="app"
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "vertical",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        >
          {(props) => <App rootRoute={props} />}
        </Stack.Screen>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "vertical",
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        >
          {(props) => <Login rootRoute={props} />}
        </Stack.Screen>
        <Stack.Screen
          name="setupOshi"
          options={{ headerTitle: "推しを選択", headerLeft: () => null }}
        >
          {(props) => <SetupOshi rootRoute={props} />}
        </Stack.Screen>
        <Stack.Screen name="setupUser" options={{ headerTitle: "ユーザー情報" }}>
          {(props) => <SetupUser rootRoute={props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Wrapper>
  );
};
