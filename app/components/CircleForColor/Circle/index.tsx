import React, { FC } from "react";

import { Icon } from "../../Icon";

import { StyledWrap, StyledEdit } from "./style";

type Props = {
  color: string;
  isEdit?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
};

export const Circle: FC<Props> = ({ color, isSelected, onPress, isEdit }) => {
  return isEdit ? (
    <StyledEdit isSelected={!!isSelected} onPress={() => onPress && onPress()}>
      <Icon name="eyedropper" size={18} />
    </StyledEdit>
  ) : (
    <StyledWrap
      color={color}
      isSelected={!!isSelected}
      onPress={() => onPress && onPress()}
      isPress={!!onPress}
    />
  );
};
