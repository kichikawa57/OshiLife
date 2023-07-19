import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfOshi } from "../../router/app/Oshi/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"top">;
};

export const Oshi: FC<Props> = ({ oshiRoute }) => {
  return (
    <>
      <StyledText>Oshi</StyledText>
      <Button radius={"sm"} type="solid" onPress={() => oshiRoute.navigation.navigate("detail")}>
        Date
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
