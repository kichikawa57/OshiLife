import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.View`
  flex: 1;
  width: 100%;
  padding: 40px 20px 0;
`;

export const StyledForm = styled.View`
  width: 100%;
  margin-bottom: 40px;
`;

export const StyledInput = styled.View<{ isMarginBottom: boolean }>`
  width: 100%;
  margin-bottom: ${({ isMarginBottom }) => (isMarginBottom ? 42 : 0)}px;
`;

export const StyledSexWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const StyledButtonWrap = styled.View`
  align-items: center;
  width: 100%;
  padding: 40px 0;
  background-color: ${colors.bgLight};
`;

export const StyledButton = styled.View`
  width: 80%;
`;

export const StyledError = styled.Text`
  margin-top: 20px;
  font-size: 12px;
  color: ${colors.error};
`;

export const CircleCheckBoxWrap = styled.View`
  margin-right: 40px;
`;
