import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.ScrollView`
  width: 100%;
`;

export const StyledInner = styled.View`
  width: 100%;
  padding: 40px 20px;
`;

export const StyledContent = styled.View<{ isHideMarginBottom?: boolean }>`
  width: 100%;
  margin-bottom: ${({ isHideMarginBottom }) => (!isHideMarginBottom ? 40 : 0)}px;
`;

export const StyledDateWrap = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const StyledDate = styled.View`
  width: 50%;
`;

export const StyledDatePickerTitle = styled.Text`
  padding: 0 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.textDark};
`;

export const StyledDatePickerError = styled.Text`
  font-size: 12px;
  color: ${colors.error};
`;
