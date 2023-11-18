import React, { ReactNode } from "react";
import { FC } from "react";

import { Icon } from "../../Icon";

import {
  StyledCenter,
  StyledInner,
  StyledLeft,
  StyledRight,
  StyledSpare,
  StyledTitle,
  StyledWrap,
} from "./style";

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
        <StyledLeft>
          {onPressLeft ? (
            <Icon
              name="chevron-left"
              onPress={onPressLeft}
              disabled={isDisabled}
              touchableWidth={300}
              touchableHeight={100}
            />
          ) : (
            <StyledSpare />
          )}
        </StyledLeft>
        <StyledCenter>
          {title ? <StyledTitle numberOfLines={1}>{title}</StyledTitle> : <StyledSpare />}
        </StyledCenter>
        <StyledRight>{right ? right : <StyledSpare />}</StyledRight>
      </StyledInner>
    </StyledWrap>
  );
};
