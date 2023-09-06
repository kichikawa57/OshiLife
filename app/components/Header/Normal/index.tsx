import React, { ReactNode } from "react";
import { FC } from "react";

import { Icon } from "../../Icon";

import { StyledInner, StyledSpare, StyledTitle, StyledWrap } from "./style";

type Props = {
  title?: string;
  onPressLeft?: () => void;
  right?: ReactNode;
};

export const Header: FC<Props> = ({ title, onPressLeft, right }) => {
  return (
    <StyledWrap>
      <StyledInner>
        {onPressLeft ? <Icon name="chevron-left" onPress={onPressLeft} /> : <StyledSpare />}
        {title ? <StyledTitle>{title}</StyledTitle> : <StyledSpare />}
        {right ? right : <StyledSpare />}
      </StyledInner>
    </StyledWrap>
  );
};
