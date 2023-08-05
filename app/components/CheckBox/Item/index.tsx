import React, { FC } from "react";
import { Avatar } from "@rneui/themed";

import { Icon } from "../../Icon";
import { colors } from "../../../shared/styles/color";

import { StyledAvatar, StyledIcon, StyledInner, StyledName, StyledWrap } from "./style";

type Props = {
  imageUrl: string;
  isSelected: boolean;
  name: string;
  isMarginRight?: boolean;
  onPress: () => void;
};

export const CheckBoxItem: FC<Props> = ({ imageUrl, isSelected, name, isMarginRight, onPress }) => {
  return (
    <StyledWrap isMarginRight={!!isMarginRight} onPress={onPress}>
      <StyledInner>
        <StyledIcon>
          {isSelected && <Icon size={12} name="check" color={colors.textDark} />}
        </StyledIcon>
        <StyledAvatar>
          <Avatar rounded size={21} source={{ uri: imageUrl }} />
        </StyledAvatar>
        <StyledName>{name}</StyledName>
      </StyledInner>
    </StyledWrap>
  );
};
