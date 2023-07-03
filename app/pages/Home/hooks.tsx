import { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";

export const useHome = () => {
  const position = useRef(new Animated.Value(0)).current;
  const isBackRef = useRef(false);
  const [isBack, setIsBack] = useState(false);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue(gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        const progress = Math.abs(gesture.dx) / (SCREEN_WIDTH * 0.8);

        isBackRef.current = progress > 0.5 ? !isBackRef.current : isBackRef.current;

        Animated.timing(position, {
          toValue: SCREEN_WIDTH * (isBackRef.current ? 0.8 : -0.8),
          duration: 200,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished) setIsBack(isBackRef.current);
        });
      },
    }),
  ).current;

  const translate = position.interpolate<number>({
    inputRange: !isBack ? [0, SCREEN_WIDTH * 0.8] : [SCREEN_WIDTH * -0.8, 0],
    outputRange: [-SCREEN_WIDTH, 0],
    extrapolate: "clamp",
  });

  return {
    isBack,
    translate,
    panResponder,
  };
};
