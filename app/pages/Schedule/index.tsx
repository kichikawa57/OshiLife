import React, { FC } from "react";
import { Button, Icon } from "@rneui/themed";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";

import { StyledText } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"top">;
};

export const Schedule: FC<Props> = ({ scheduleRoute }) => {
  return (
    <>
      <StyledText>Schedule</StyledText>
      <Button radius={"sm"} type="solid" onPress={() => scheduleRoute.navigation.navigate("date")}>
        Date
        <Icon name="save" color="white" />
      </Button>
    </>
  );
};
