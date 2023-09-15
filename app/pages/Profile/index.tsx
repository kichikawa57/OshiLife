import React, { FC } from "react";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfProfile } from "../../router/app/Profile/types";
import { TrackButton } from "../../components/TrackButton";

import {
  StyledWrap,
  StyledListWrap,
  StyledList,
  StyledListTitle,
  StyledListText,
  StyledListTextWrap,
} from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"profile">;
  profileRoute: RoutingPropsOfProfile<"top">;
};

export const Profile: FC<Props> = ({ profileRoute }) => {
  return (
    <>
      <StyledWrap>
        <StyledListWrap>
          <StyledList>
            <StyledListTitle>メールアドレス</StyledListTitle>
            <StyledListTextWrap>
              <StyledListText>k.ichikawa057@gmail.com</StyledListText>
            </StyledListTextWrap>
          </StyledList>
        </StyledListWrap>
      </StyledWrap>
      <TrackButton
        buttonText="編集"
        iconName="pencil"
        onPress={() => {
          profileRoute.navigation.navigate("edit", {
            id: "id-01",
            email: "k.ichikawa057@gmail.com",
          });
        }}
      />
    </>
  );
};
