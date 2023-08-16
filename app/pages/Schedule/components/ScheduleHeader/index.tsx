import React, { FC } from "react";
import { Dayjs } from "dayjs";

import { StyledHeaderTextWrap, StyledHeader, StyledText } from "./style";

type Props = {
  currentDate: Dayjs;
  onPress: () => void;
};

export const ScheduleHeader: FC<Props> = ({ onPress, currentDate }) => {
  return (
    <StyledHeader>
      <StyledHeaderTextWrap onPress={onPress}>
        <StyledText>{currentDate.format("YYYY年MM月")}</StyledText>
      </StyledHeaderTextWrap>
    </StyledHeader>
  );
};
