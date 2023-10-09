import React, { FC } from "react";
import { ActivityIndicator } from "react-native";

import { colors } from "../../shared/styles/color";

import { StyledWrap } from "./style";

type Props = {
  //
};

export const Loading: FC<Props> = () => {
  return (
    <StyledWrap>
      <ActivityIndicator size="large" color={colors.primary} />
    </StyledWrap>
  );
};
