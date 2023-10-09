import React, { ReactNode } from "react";
import { FC } from "react";

import { Icon } from "../../Icon";

import { StyledInner, StyledSpare, StyledTitle, StyledWrap } from "./style";

type Props = {
  title?: string;
  onPressLeft?: () => void;
  right?: ReactNode;
  isDisabled?: boolean;
};

export const Header: FC<Props> = ({ title, onPressLeft, right, isDisabled }) => {
  return (
    <StyledWrap>
      <StyledInner>
        {onPressLeft ? (
          <Icon name="chevron-left" onPress={onPressLeft} disabled={isDisabled} />
        ) : (
          <StyledSpare />
        )}
        {title ? <StyledTitle>{title}</StyledTitle> : <StyledSpare />}
        {right ? right : <StyledSpare />}
      </StyledInner>
    </StyledWrap>
  );
};
