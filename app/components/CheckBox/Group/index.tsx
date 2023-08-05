import React, { FC, ReactNode } from "react";

import { StyledInner, StyledWrap } from "./style";

type Props = {
  children: ReactNode;
};

export const CheckBoxGroup: FC<Props> = ({ children }) => {
  return (
    <StyledWrap horizontal={true} showsHorizontalScrollIndicator={false}>
      <StyledInner>{children}</StyledInner>
    </StyledWrap>
  );
};
