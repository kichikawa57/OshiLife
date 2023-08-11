import React, { FC } from "react";

import { Button } from "../Button";
import { IconName } from "../../shared/types/components/icon";

import { StyledWrap } from "./style";

interface Props {
  buttonText: string;
  iconName: IconName;
  isHiddenHeader?: boolean;
  onPress: () => void;
}

export const TrackButton: FC<Props> = ({ buttonText, iconName, isHiddenHeader, onPress }) => {
  return (
    <StyledWrap isHiddenHeader={!!isHiddenHeader}>
      <Button title={buttonText} iconName={iconName} onPress={onPress} />
    </StyledWrap>
  );
};
