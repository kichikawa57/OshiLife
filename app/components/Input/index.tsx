import React, { FC } from "react";
import { Input as InputOfRneui, InputProps } from "@rneui/themed";

import { colors } from "../../shared/styles/color";

import { StyledInputWrap, StyledTitle, StyledTouchableOpacity, StyledWrap } from "./style";

interface Props extends InputProps {
  title?: string;
  onPress?: () => void;
}

export const Input: FC<Omit<Props, "autoCapitalize" | "ref" | "errorStyle" | "containerStyle">> = ({
  title,
  errorMessage,
  onPress,
  ...props
}) => {
  return (
    <StyledWrap>
      {title && <StyledTitle>{title}</StyledTitle>}
      <StyledInputWrap>
        {onPress && <StyledTouchableOpacity onPress={onPress} />}
        <InputOfRneui
          {...props}
          autoCapitalize="none"
          errorMessage={errorMessage}
          containerStyle={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
          errorStyle={{
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            color: colors.error,
            fontSize: 12,
            display: errorMessage ? "flex" : "none",
          }}
        />
      </StyledInputWrap>
    </StyledWrap>
  );
};
