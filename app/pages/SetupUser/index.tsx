import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../router/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"setupUser">;
};

export const SetupUser: FC<Props> = ({ rootRoute }) => {
  return (
    <>
      <StyledText>SetupUser</StyledText>
      <Button radius={"sm"} type="solid" onPress={() => rootRoute.navigation.navigate("setupOshi")}>
        SetupOshi
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
