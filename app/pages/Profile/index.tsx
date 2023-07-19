import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfProfile } from "../../router/app/Profile/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"profile">;
  profileRoute: RoutingPropsOfProfile<"top">;
};

export const Profile: FC<Props> = ({ appRoute }) => {
  return (
    <>
      <StyledText>Profile</StyledText>
      <Button radius={"sm"} type="solid" onPress={() => appRoute.navigation.navigate("schedule")}>
        Schedule
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
