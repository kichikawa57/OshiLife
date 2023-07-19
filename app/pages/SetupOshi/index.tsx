import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../router/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"setupOshi">;
};

export const SetupOshi: FC<Props> = ({ rootRoute }) => {
  return (
    <>
      <StyledText>SetupOshi</StyledText>
      <Button
        radius={"sm"}
        type="solid"
        onPress={() => rootRoute.navigation.reset({ index: 0, routes: [{ name: "app" }] })}
      >
        App
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
