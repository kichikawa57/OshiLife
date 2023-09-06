import React, { FC, ReactNode } from "react";

import {
  StyledHeader,
  StyledScrollView,
  StyledTextButton,
  StyledTextButtonWrap,
  StyledView,
  StyledViewInner,
} from "./style";

type Props = {
  children: ReactNode;
  headerPosition?: "center" | "right";
  isAbleToScroll?: boolean;
  isCenter?: boolean;
  isFullHeight?: boolean;
  isStatusBar?: boolean;
  onPressCancel?: () => void;
  onPressComplete?: () => void;
};

export const ContentBase: FC<Props> = ({
  children,
  headerPosition = "center",
  isAbleToScroll = true,
  isFullHeight = true,
  isStatusBar = false,
  isCenter,
  onPressCancel,
  onPressComplete,
}) => {
  return (
    <StyledView isFullHeight={isFullHeight} isStatusBar={isStatusBar}>
      <StyledViewInner isFullHeight={isFullHeight}>
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
        <StyledScrollView
          scrollEnabled={isAbleToScroll}
          contentContainerStyle={
            !isAbleToScroll &&
            isCenter && { justifyContent: "center", alignItems: "center", flex: 1 }
          }
        >
          {children}
        </StyledScrollView>
      </StyledViewInner>
    </StyledView>
  );
};
