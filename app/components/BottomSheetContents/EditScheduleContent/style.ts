import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledContent = styled.View<{ isHiddenBottom?: boolean }>`
  padding-bottom: ${({ isHiddenBottom }) => (!isHiddenBottom ? 20 : 0)}px;
`;

export const StyledDatePickerWrap = styled.View`
  width: 100%;
`;

export const StyledDatePicker = styled.View`
  width: 100%;
`;

export const StyledDatePickerTitle = styled.Text`
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.textDark};
`;

export const StyledDatePickerError = styled.Text`
  padding: 0 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.error};
`;
