import styled from "styled-components/native";

export const StyledWrap = styled.View<{ isPanel: boolean }>`
  width: 100%;
  padding: ${({ isPanel }) => (isPanel ? 4 : 0)}px;
  border-radius: ${({ isPanel }) => (isPanel ? 10 : 0)}px;
`;

export const StyledTabPanel = styled.View`
  padding: 10px 20px 0;
`;
