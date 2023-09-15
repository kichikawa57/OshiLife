import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.View`
  width: 100%;
`;

export const StyledTitle = styled.Text`
  width: 100%;
  font-size: 12px;
  color: ${colors.textDark};
`;

export const StyledErrorText = styled.Text`
  width: 100%;
  font-size: 12px;
  color: ${colors.error};
`;
