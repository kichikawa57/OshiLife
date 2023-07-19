import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"detail">;
};

export const Detail: FC<Props> = ({ scheduleRoute }) => {
  return (
    <>
      <StyledText>Schedule Detail</StyledText>
      <Button radius={"sm"} type="solid" onPress={() => scheduleRoute.navigation.navigate("top")}>
        Top
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
