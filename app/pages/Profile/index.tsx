import React, { FC } from "react";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfProfile } from "../../router/app/Profile/types";
import { TrackButton } from "../../components/TrackButton";
import { Loading } from "../../components/Loading";

import {
  StyledWrap,
  StyledListWrap,
  StyledList,
  StyledListTitle,
  StyledListText,
  StyledListTextWrap,
} from "./style";
import { useProfile } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"profile">;
  profileRoute: RoutingPropsOfProfile<"top">;
};

export const Profile: FC<Props> = ({ profileRoute }) => {
  const { data, isLoading } = useProfile();

  return (
    <>
      {isLoading || !data ? (
        <Loading />
      ) : (
        <>
          <StyledWrap>
            <StyledListWrap>
              <StyledList>
                <StyledListTitle>ユーザー名</StyledListTitle>
                <StyledListTextWrap>
                  <StyledListText>{data.name}</StyledListText>
                </StyledListTextWrap>
              </StyledList>
              <StyledList>
                <StyledListTitle>性別</StyledListTitle>
                <StyledListTextWrap>
                  <StyledListText>{data.sex === "men" ? "男性" : "女性"}</StyledListText>
                </StyledListTextWrap>
              </StyledList>
              <StyledList isHiddenMarginButtom>
                <StyledListTitle>メールアドレス</StyledListTitle>
                <StyledListTextWrap>
                  <StyledListText>{data.email}</StyledListText>
                </StyledListTextWrap>
              </StyledList>
            </StyledListWrap>
          </StyledWrap>
          <TrackButton
            buttonText="編集"
            iconName="pencil"
            onPress={() => {
              profileRoute.navigation.navigate("edit", {
                id: data.id,
                name: data.name,
                email: data.email,
                sex: data.sex,
              });
            }}
          />
        </>
      )}
    </>
  );
};
