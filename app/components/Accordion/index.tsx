import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { LayoutAnimation, Animated, Easing } from "react-native";

import { Icon } from "../Icon";

import { StyledHead, StyledHeadTitle, StyledView } from "./style";

type Props = {
  title: string;
  children: ReactNode;
};

export const Accordion: FC<Props> = ({ title, children }) => {
  const spinValue = useRef<Animated.Value | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    spinValue.current = new Animated.Value(0);
  }, []);

  const onPress = () => {
    setIsOpen((props) => !props);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    spinValue.current &&
      Animated.timing(spinValue.current, {
        toValue: isOpen ? 0 : 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
  };

  return (
    <StyledView>
      <StyledHead onPress={onPress}>
        <StyledHeadTitle>{title}</StyledHeadTitle>
        <Animated.View
          style={
            spinValue.current && {
              transform: [
                {
                  rotate: spinValue.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            }
          }
        >
          <Icon name="chevron-down" size={12} />
        </Animated.View>
      </StyledHead>
      {isOpen && children}
    </StyledView>
  );
};
