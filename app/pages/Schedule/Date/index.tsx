import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"date">;
};

export const Date: FC<Props> = ({ scheduleRoute }) => {
  return (
    <>
      <StyledText>Schedule Date</StyledText>
      <Button
        radius={"sm"}
        type="solid"
        onPress={() => scheduleRoute.navigation.navigate("detail")}
      >
        Detail
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
