import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.View`
  width: 100%;
`;

export const StyledTitle = styled.Text`
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.textDark};
`;

const width = 100 + 5;
export const StyledCircleWrap = styled.View`
  flex-flow: row wrap;
  width: ${width}%;
  margin: 0 -2.5% 10px;
`;

export const StyledCircle = styled.View`
  width: 16.6666%;
  padding: 0 2.5%;
`;

export const StyledErrorText = styled.Text`
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.error};
`;
