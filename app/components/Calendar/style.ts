import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledView = styled.View`
  flex: 1;
  width: auto;
  padding: 20px 0 0;
`;

export const StyledCalendarContentWrap = styled.View`
  flex: 0.2;
  flex-flow: row wrap;
  width: 100%;
`;

export const StyledCalendarContent = styled.TouchableOpacity`
  width: 14.2857%;

  /* flex: 0.14285714; */

  /* align-items: center;
  justify-content: center; */
`;

export const StyledCalendarContentInner = styled.View`
  width: 100%;

  /* flex: 1; */
  padding: 5px 0 20px;
`;

export const StyledTextWrap = styled.View`
  align-items: center;
  width: 100%;
`;

export const StyledText = styled.Text<{ isCurrent: boolean; isOtherMonth: boolean }>`
  font-size: 14px;
  color: ${({ isCurrent, isOtherMonth }) =>
    isCurrent ? colors.strong : isOtherMonth ? colors.textDarkSecondary : colors.textDark};
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
