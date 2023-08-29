import React, { FC } from "react";
import { Dayjs } from "dayjs";

import { Icon } from "../../../../components/Icon";

import { StyledHeaderTextWrap, StyledHeader, StyledText, StyledFilterWrap } from "./style";

type Props = {
  currentDate: Dayjs;
  onPressDate: () => void;
  onPressFilter: () => void;
};

export const ScheduleHeader: FC<Props> = ({ onPressDate, onPressFilter, currentDate }) => {
  return (
    <StyledHeader>
      <StyledHeaderTextWrap onPress={onPressDate}>
        <StyledText>{currentDate.format("YYYY年MM月")}</StyledText>
      </StyledHeaderTextWrap>
      <StyledFilterWrap onPress={onPressFilter}>
        <Icon name="filter" />
      </StyledFilterWrap>
    </StyledHeader>
  );
};
