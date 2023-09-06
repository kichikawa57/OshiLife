import React, { FC } from "react";

import { Button } from "../Button";
import { IconName } from "../../shared/types/components/icon";

import { StyledInner, StyledWrap } from "./style";

interface Props {
  buttonText: string;
  iconName: IconName;
  onPress: () => void;
}

export const TrackButton: FC<Props> = ({ buttonText, iconName, onPress }) => {
  return (
    <StyledWrap>
      <StyledInner>
        <Button title={buttonText} iconName={iconName} onPress={onPress} />
      </StyledInner>
    </StyledWrap>
  );
};
