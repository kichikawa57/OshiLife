import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfOshi } from "../../../router/app/Oshi/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"detail">;
};

export const Detail: FC<Props> = ({ oshiRoute }) => {
  return (
    <>
      <StyledText>Oshi Detail</StyledText>
      <Button radius={"sm"} type="solid" onPress={() => oshiRoute.navigation.navigate("top")}>
        Top
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
