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
            <StyledListTitle>ユーザー名</StyledListTitle>
            <StyledListTextWrap>
              <StyledListText>kota</StyledListText>
            </StyledListTextWrap>
          </StyledList>
          <StyledList>
            <StyledListTitle>性別</StyledListTitle>
            <StyledListTextWrap>
              <StyledListText>男性</StyledListText>
            </StyledListTextWrap>
          </StyledList>
          <StyledList isHiddenMarginButtom>
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
            name: "kota",
            email: "k.ichikawa057@gmail.com",
            sex: "men",
          });
        }}
      />
    </>
  );
};
