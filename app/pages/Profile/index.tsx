import React, { FC } from "react";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfProfile } from "../../router/app/Profile/types";

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

export const Profile: FC<Props> = () => {
  return (
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
  );
};
