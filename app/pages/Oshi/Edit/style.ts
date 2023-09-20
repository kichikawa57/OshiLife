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

export const StyledTitle = styled.Text`
  font-size: 12px;
  margin-bottom: 12px;
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

export const StyledImageTouch = styled.TouchableOpacity`
  display: block;
`;
