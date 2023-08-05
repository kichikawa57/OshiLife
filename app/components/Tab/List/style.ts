import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.View<{ isPanel: boolean }>`
  width: 100%;
  padding: ${({ isPanel }) => (isPanel ? 4 : 0)}px;
  background-color: ${colors.bgLight};
  border-radius: ${({ isPanel }) => (isPanel ? 10 : 0)}px;
`;

export const StyledTabPanel = styled.View`
  padding: 10px 20px 0;
`;
