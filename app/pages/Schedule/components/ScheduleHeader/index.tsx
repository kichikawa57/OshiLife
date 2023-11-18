import React, { FC } from "react";
import { Dayjs } from "dayjs";

import { Icon } from "../../../../components/Icon";

import {
  StyledHeaderTextWrap,
  StyledHeader,
  StyledText,
  StyledFilterWrap,
  StyledHeaderLeft,
  StyledIcon,
  StyledIconLeft,
  StyledIconLeftInner,
  StyledIconRightInner,
  StyledIconCenter,
  StyledIconRefresh,
} from "./style";

type Props = {
  currentDate: Dayjs;
  onPressNextButton: () => void;
  onPressPrevButton: () => void;
  onPressDate: () => void;
  onPressRefresh: () => void;
  onPressCurrentDate: () => void;
  onPressFilter: () => void;
};

export const ScheduleHeader: FC<Props> = ({
  onPressDate,
  onPressFilter,
  onPressNextButton,
  onPressPrevButton,
  onPressCurrentDate,
  onPressRefresh,
  currentDate,
}) => {
  return (
    <StyledHeader>
      <StyledHeaderLeft>
        <StyledHeaderTextWrap onPress={onPressDate}>
          <StyledText>{currentDate.format("YYYY年MM月")}</StyledText>
        </StyledHeaderTextWrap>

        <StyledIconLeft onPress={onPressPrevButton}>
          <StyledIconLeftInner>
            <Icon name="caret-left" />
          </StyledIconLeftInner>
        </StyledIconLeft>

        <StyledIconCenter onPress={onPressCurrentDate}>
          <Icon name="calendar-o" size={12} />
        </StyledIconCenter>

        <StyledIcon onPress={onPressNextButton}>
          <StyledIconRightInner>
            <Icon name="caret-right" />
          </StyledIconRightInner>
        </StyledIcon>

        <StyledIconRefresh>
          <Icon name="refresh" onPress={onPressRefresh} />
        </StyledIconRefresh>
      </StyledHeaderLeft>
      <StyledFilterWrap>
        <Icon name="filter" onPress={onPressFilter} />
      </StyledFilterWrap>
    </StyledHeader>
  );
};
