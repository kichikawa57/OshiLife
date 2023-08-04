import React, { FC } from "react";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfOshi } from "../../router/app/Oshi/types";
import { ListItem } from "../../components/List";
import { TrackButton } from "../../components/TrackButton";

import { StyledList, StyledListWrap, StyledContentWrap, StyledWrap } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"top">;
};

export const Oshi: FC<Props> = ({ oshiRoute }) => {
  return (
    <StyledWrap>
      <StyledContentWrap>
        <StyledListWrap>
          <StyledList>
            <ListItem
              title="川村 和馬"
              onPress={() => oshiRoute.navigation.navigate("detail")}
              avatarUrl="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
              bottomDivider={true}
            />
            <ListItem
              title="川村 和馬"
              onPress={() => oshiRoute.navigation.navigate("detail")}
              avatarUrl="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
              bottomDivider={true}
            />
            <ListItem
              title="川村 和馬"
              onPress={() => oshiRoute.navigation.navigate("detail")}
              avatarUrl="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
            />
          </StyledList>
        </StyledListWrap>
      </StyledContentWrap>
      <TrackButton buttonText="追加" iconName="plus" />
    </StyledWrap>
  );
};
