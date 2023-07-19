import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../router/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"login">;
};

export const Login: FC<Props> = ({ rootRoute }) => {
  return (
    <>
      <StyledText>Login</StyledText>
      <Button radius={"sm"} type="solid" onPress={() => rootRoute.navigation.navigate("setupUser")}>
        SetupUser
        <Icon name="save" color="white" />
      </Button>
      <Button radius={"sm"} type="solid" onPress={() => rootRoute.navigation.navigate("setupOshi")}>
        SetupOshi
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
