import React, { FC } from "react";
import { SwitchProps } from "@rneui/themed";

import { SwitchItem } from "../Item";

import { StyledWrap, StyledText } from "./style";

type Props = {
  text: string;
  switchProps: SwitchProps;
};

export const SwitchList: FC<Props> = ({ text, switchProps }) => {
  return (
    <StyledWrap>
      <StyledText>{text}</StyledText>
      <SwitchItem {...switchProps} />
    </StyledWrap>
  );
};
