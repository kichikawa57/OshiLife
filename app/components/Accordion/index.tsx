import React, { FC, ReactNode, useState } from "react";
import { LayoutAnimation, Animated, Easing } from "react-native";

import { Icon } from "../Icon";

import { StyledHead, StyledHeadTitle, StyledView } from "./style";

type Props = {
  title: string;
  children: ReactNode;
};

const spinValue = new Animated.Value(0);

export const Accordion: FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onPress = () => {
    setIsOpen((props) => !props);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(spinValue, {
      toValue: isOpen ? 0 : 1,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <StyledView>
      <StyledHead onPress={onPress}>
        <StyledHeadTitle>{title}</StyledHeadTitle>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Icon name="chevron-down" size={12} />
        </Animated.View>
      </StyledHead>
      {isOpen && children}
    </StyledView>
  );
};
