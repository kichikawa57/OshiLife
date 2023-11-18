import React, { useState } from "react";
import { Icon as IconOfRneui, IconProps } from "@rneui/themed";
import { FC } from "react";
import { LayoutChangeEvent } from "react-native";

import { IconName } from "../../shared/types/components/icon";

import { StyledTouchable, StyledWrap } from "./style";

interface Props extends IconProps {
  name: IconName;
  touchableWidth?: number;
  touchableHeight?: number;
}

export const Icon: FC<Omit<Props, "type">> = ({
  touchableWidth,
  touchableHeight,
  onPress,
  ...props
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [childSize, setChildSize] = useState({ width: 0, height: 0 });

  return (
    <StyledWrap>
      {onPress && (
        <StyledTouchable
          onLayout={(event: LayoutChangeEvent) => {
            const { width, height } = event.nativeEvent.layout;
            setSize({ width, height });
          }}
          touchableWidth={touchableWidth}
          touchableHeight={touchableHeight}
          parentWidth={size.width > 0 ? size.width - childSize.width : size.width}
          parentHeight={size.height > 0 ? size.height - childSize.height : size.height}
          onPress={onPress}
        />
      )}
      <IconOfRneui
        {...props}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setChildSize({ width, height });
        }}
        type="font-awesome"
      />
    </StyledWrap>
  );
};
