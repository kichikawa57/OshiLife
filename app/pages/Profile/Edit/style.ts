import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.ScrollView`
  width: 100%;
  padding: 40px 20px 0;
`;

export const StyledContent = styled.View<{ isHideMarginBottom?: boolean }>`
  width: 100%;
  margin-bottom: ${({ isHideMarginBottom }) => (!isHideMarginBottom ? 40 : 0)}px;
`;

export const StyledDatePickerTitle = styled.Text`
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.textDark};
`;

export const StyledError = styled.Text`
  margin-top: 20px;
  font-size: 12px;
  color: ${colors.error};
`;

export const StyledSexWrap = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
