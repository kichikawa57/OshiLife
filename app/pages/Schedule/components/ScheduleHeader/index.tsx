import React, { FC } from "react";

import { Icon } from "../../../../components/Icon";

import {
  StyledHeader,
  StyledFilterWrap,
  StyledWeekWrap,
  StyledWeekText,
  StyledWeekTextForSunday,
  StyledWeekTextForSaturday,
} from "./style";

type Props = {
  onPressFilter: () => void;
};

export const ScheduleHeader: FC<Props> = ({ onPressFilter }) => {
  return (
    <StyledHeader>
      <StyledFilterWrap>
        <Icon name="filter" onPress={onPressFilter} />
      </StyledFilterWrap>
      <StyledWeekWrap>
        <StyledWeekTextForSunday>日</StyledWeekTextForSunday>
        <StyledWeekText>月</StyledWeekText>
        <StyledWeekText>火</StyledWeekText>
        <StyledWeekText>水</StyledWeekText>
        <StyledWeekText>木</StyledWeekText>
        <StyledWeekText>金</StyledWeekText>
        <StyledWeekTextForSaturday>土</StyledWeekTextForSaturday>
      </StyledWeekWrap>
    </StyledHeader>
  );
};
