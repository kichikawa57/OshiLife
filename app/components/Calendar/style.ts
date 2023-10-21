import styled, { css } from "styled-components/native";

import { colors, dateColors } from "../../shared/styles/color";

export const StyledView = styled.View`
  flex: 1;
  width: auto;
`;

export const StyledCalendarContentWrap = styled.View`
  flex-flow: wrap;
  width: 100%;
`;

const styleTopBorder = css`
  border-top-color: ${colors.borderDarkSecondary};
  border-top-width: 1px;
`;

export const StyledCalendarWeek = styled.View<{ isFirstWeek: boolean }>`
  position: relative;
  flex-flow: row;
  width: 100%;
  border-bottom-color: ${colors.borderDarkSecondary};
  border-bottom-width: 1px;

  ${({ isFirstWeek }) => isFirstWeek && styleTopBorder}
`;

export const StyledCalendarContent = styled.View`
  position: relative;
  z-index: 2;
  width: 14.2857%;
`;

export const StyledCalendar = styled.View`
  display: block;
`;

export const StyledCalendarEventPanel = styled.TouchableOpacity<{ index: number }>`
  position: absolute;
  top: 0;
  left: ${({ index }) => 14.2857 * index}%;
  z-index: 3;
  width: 14.2857%;
  height: 100%;
  opacity: 0;
`;

export const StyledCalendarBorder = styled.View<{ index: number }>`
  position: absolute;
  top: 0;
  left: ${({ index }) => 14.2857 * (index + 1)}%;
  z-index: 0;
  width: 1px;
  height: 100%;
  background-color: ${colors.borderDarkSecondary};
`;

export const StyledCalendarContentBg = styled.View<{ index: number }>`
  position: absolute;
  top: 0;
  left: ${({ index }) => 14.2857 * index}%;
  z-index: 1;
  width: 14.2857%;
  height: 100%;
  border: solid 2px ${colors.primary};
`;

export const StyledCalendarContentInner = styled.View`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 5px 0 20px;
`;

export const StyledTextWrap = styled.View`
  align-items: center;
  width: 100%;
`;

type StyledTextProps = {
  isCurrent: boolean;
  isOtherMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  isHoliday: boolean;
};

const selectColor = ({
  isOtherMonth,
  isSunday,
  isSaturday,
  isHoliday,
}: Omit<StyledTextProps, "isCurrent">) => {
  if (isOtherMonth) return colors.textDarkSecondary;
  if (isSunday) return dateColors.sunday;
  if (isSaturday) return dateColors.saturday;
  if (isHoliday) return dateColors.holiday;

  return colors.textDark;
};
export const StyledText = styled.Text<StyledTextProps>`
  font-size: 14px;
  color: ${({ isOtherMonth, isSunday, isSaturday, isHoliday }) =>
    selectColor({ isOtherMonth, isSunday, isSaturday, isHoliday })};
`;
export const StyledHolidayText = styled.Text`
  margin-top: 2px;
  font-size: 10px;
  color: ${colors.error};
`;

export const StyledScheduleDetail = styled.Text<{
  isTransparent?: boolean;
  startWeekIndex: number;
  endWeekIndex: number;
}>`
  width: ${({ startWeekIndex, endWeekIndex, isTransparent }) =>
    (isTransparent ? 98 : endWeekIndex + 1 - startWeekIndex) * 98}%;
  margin-top: 4px;
  overflow: hidden;
  font-size: 12px;
  background-color: ${colors.primary};
  opacity: ${({ isTransparent }) => (isTransparent ? 0 : 1)};
`;
