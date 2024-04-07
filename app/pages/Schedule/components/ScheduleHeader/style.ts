import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { colors, dateColors } from "../../../../shared/styles/color";

export const StyledHeader = styled.View`
  width: 100%;
  padding: ${getStatusBarHeight() + 5}px 0 0 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${colors.borderDarkSecondary};
`;

export const StyledHeaderTextWrap = styled.TouchableOpacity`
  display: block;
  margin-right: 20px;
`;

export const StyledFilterWrap = styled.View`
  width: 100%;
  padding: 0 20px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledWeekWrap = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 10px 0 0;
`;

export const StyledWeekText = styled.Text`
  width: 14.2857%;
  font-size: 12px;
  text-align: center;
  color: ${colors.textDark};
`;

export const StyledWeekTextForSunday = styled(StyledWeekText)`
  color: ${dateColors.sunday};
`;

export const StyledWeekTextForSaturday = styled(StyledWeekText)`
  color: ${dateColors.saturday};
`;
