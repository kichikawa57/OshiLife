import React, { FC } from "react";
import { Input as InputOfRneui, InputProps } from "@rneui/themed";

import { colors } from "../../shared/styles/color";

import { StyledContent, StyledTitle, StyledWrap } from "./style";

interface Props extends InputProps {
  title?: string;
}

export const Textarea: FC<Omit<Props, "autoCapitalize" | "ref" | "multiline">> = ({
  title,
  errorMessage,
  ...props
}) => {
  return (
    <StyledWrap>
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>
        <InputOfRneui
          {...props}
          autoCapitalize="none"
          multiline
          errorMessage={errorMessage}
          containerStyle={{
            paddingLeft: 0,
            paddingRight: 0,
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ minHeight: 100, maxHeight: 100, borderWidth: 1 }}
          errorStyle={{
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            color: colors.error,
            fontSize: 12,
            display: errorMessage ? "flex" : "none",
          }}
        />
      </StyledContent>
    </StyledWrap>
  );
};
