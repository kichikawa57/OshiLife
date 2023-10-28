import React, { FC } from "react";

import { RoutingPropsOfProfile } from "../../../router/app/Profile/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfRoot } from "../../../router/types";
import { Header } from "../../../components/Header/Normal";

import {
  StyledLogout,
  StyledLogoutWrap,
  StyledScrollViewInner,
  StyledScrollViewWrap,
  StyledWrap,
} from "./style";
import { useSetting } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"profile">;
  profileRoute: RoutingPropsOfProfile<"setting">;
};

export const Setting: FC<Props> = ({ profileRoute, rootRoute }) => {
  const { signoutMutation } = useSetting(rootRoute);

  return (
    <>
      <Header
        title={"設定"}
        onPressLeft={() => {
          profileRoute.navigation.goBack();
        }}
      />
      <StyledWrap>
        <StyledScrollViewWrap>
          <StyledScrollViewInner>
            <StyledLogoutWrap
              onPress={() => {
                signoutMutation.mutate();
              }}
            >
              <StyledLogout>ログアウト</StyledLogout>
            </StyledLogoutWrap>
          </StyledScrollViewInner>
        </StyledScrollViewWrap>
      </StyledWrap>
    </>
  );
};
