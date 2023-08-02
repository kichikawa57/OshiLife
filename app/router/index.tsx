import React from "react";
import type { FC } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import { Login } from "../pages/Login";
import { SetupOshi } from "../pages/SetupOshi";
import { SetupUser } from "../pages/SetupUser";

import { Wrapper } from "./helper/Wrapper";
import { RoutingOfRoot } from "./types";
import { App } from "./app";

const Stack = createStackNavigator<RoutingOfRoot>();

export const Router: FC = () => {
  return (
    <Wrapper>
      <Stack.Navigator initialRouteName="setupUser">
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
        <Stack.Screen name="setupOshi">{(props) => <SetupOshi rootRoute={props} />}</Stack.Screen>
        <Stack.Screen name="setupUser" options={{ headerTitle: "ユーザー情報" }}>
          {(props) => <SetupUser rootRoute={props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Wrapper>
  );
};
