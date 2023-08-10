import React, { FC } from "react";
import { Input as InputOfRneui, InputProps } from "@rneui/themed";

import { StyledContent, StyledTitle, StyledWrap } from "./style";

interface Props extends InputProps {
  title?: string;
}

export const Textarea: FC<Omit<Props, "autoCapitalize" | "ref" | "multiline">> = ({
  title,
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
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ minHeight: 100, maxHeight: 100, borderWidth: 1 }}
        />
      </StyledContent>
    </StyledWrap>
  );
};
