import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledText = styled.Text`
  font-size: 16px;
  color: ${colors.textDark};
`;
