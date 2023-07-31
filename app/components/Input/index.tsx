import React, { FC } from "react";
import { Input as InputOfRneui, InputProps } from "@rneui/themed";

import { StyledTitle, StyledWrap } from "./style";

interface Props extends InputProps {
  title?: string;
}

export const Input: FC<Omit<Props, "autoCapitalize" | "ref">> = ({ title, ...props }) => {
  return (
    <StyledWrap>
      <StyledTitle>{title}</StyledTitle>
      <InputOfRneui {...props} autoCapitalize="none" />
    </StyledWrap>
  );
};
