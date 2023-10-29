import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.View`
  flex: 1;
  width: 100%;
  padding: ${getStatusBarHeight() + 10}px 20px 0;
`;

export const StyledTitle = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const StyledImage = styled.View`
  width: 180px;
  height: 180px;
`;

export const StyledForm = styled.View`
  width: 100%;
  margin-bottom: 40px;
`;

export const StyledInput = styled.View<{ isMarginBottom: boolean }>`
  width: 100%;
  margin-bottom: ${({ isMarginBottom }) => (isMarginBottom ? 42 : 0)}px;
`;

export const StyledButtonWrap = styled.View`
  align-items: center;
  width: 100%;
  padding: 24px 0;
  background-color: ${colors.bgLight};
`;

export const StyledButton = styled.View<{ isMarginBottom: boolean }>`
  width: 90%;
  margin-bottom: ${({ isMarginBottom }) => (isMarginBottom ? 10 : 0)}px;
`;
