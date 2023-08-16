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
  headerPosition?: "center" | "right";
  onPressCancel?: () => void;
  onPressComplete?: () => void;
};

export const ContentBase: FC<Props> = ({
  children,
  headerPosition = "center",
  onPressCancel,
  onPressComplete,
}) => {
  return (
    <StyledView>
      <StyledHeader headerPosition={headerPosition}>
        {onPressCancel && (
          <StyledTextButtonWrap>
            <StyledTextButton onPress={onPressCancel}>キャンセル</StyledTextButton>
          </StyledTextButtonWrap>
        )}
        {onPressComplete && (
          <StyledTextButtonWrap>
            <StyledTextButton onPress={onPressComplete}>完了</StyledTextButton>
          </StyledTextButtonWrap>
        )}
      </StyledHeader>
      <StyledScrollView>{children}</StyledScrollView>
    </StyledView>
  );
};
