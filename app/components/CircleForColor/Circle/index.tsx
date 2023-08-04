import React from "react";
import { FC } from "react";

import { CircleColor, circleColors } from "../shared";

import { StyledWrap } from "./style";

type Props = {
  color: CircleColor;
  isSelected?: boolean;
  onPress?: () => void;
};

export const Circle: FC<Props> = ({ color, isSelected, onPress }) => {
  return (
    <StyledWrap
      color={circleColors[color]}
      isSelected={!!isSelected}
      onPress={() => onPress && onPress}
      isPress={!!onPress}
    />
  );
};
