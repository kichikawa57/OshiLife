import React, { FC, ReactNode } from "react";

import {
  StyledHeader,
  StyledScrollView,
  StyledTextButton,
  StyledTextButtonWrap,
  StyledView,
} from "./style";

type Props = {
  children: ReactNode;
  onPressCancel: () => void;
  onPressComplete: () => void;
};

export const ContentBase: FC<Props> = ({ children, onPressCancel, onPressComplete }) => {
  return (
    <StyledView>
      <StyledHeader>
        <StyledTextButtonWrap>
          <StyledTextButton onPress={onPressCancel}>キャンセル</StyledTextButton>
        </StyledTextButtonWrap>
        <StyledTextButtonWrap>
          <StyledTextButton onPress={onPressComplete}>完了</StyledTextButton>
        </StyledTextButtonWrap>
      </StyledHeader>
      <StyledScrollView>{children}</StyledScrollView>
    </StyledView>
  );
};
