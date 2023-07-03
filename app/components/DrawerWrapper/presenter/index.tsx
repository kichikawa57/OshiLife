import React from "react";
import type { FC, ReactNode } from "react";
import { Animated, PanResponderInstance } from "react-native";

import { StyledDrawerView, StyledText, StyledView } from "./style";

type Props = {
  body: ReactNode;
  translate: Animated.AnimatedInterpolation<number>;
  panResponder: PanResponderInstance;
};

export const DrawerWrapperPresenter: FC<Props> = ({ body, translate, panResponder }: Props) => {
  return (
    <StyledView {...panResponder.panHandlers}>
      <StyledDrawerView style={{ transform: [{ translateX: translate }] }}>
        <StyledText>DrawerWrapperPresenter</StyledText>
      </StyledDrawerView>
      {body}
    </StyledView>
  );
};
