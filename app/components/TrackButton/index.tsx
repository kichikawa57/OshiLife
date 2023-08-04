import React, { FC } from "react";

import { Button } from "../Button";
import { IconName } from "../../shared/types/components/icon";

import { StyledWrap } from "./style";

interface Props {
  buttonText: string;
  iconName: IconName;
}

export const TrackButton: FC<Props> = ({ buttonText, iconName }) => {
  return (
    <StyledWrap>
      <Button title={buttonText} iconName={iconName} onPress={() => null} />
    </StyledWrap>
  );
};
