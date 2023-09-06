import styled from "styled-components/native";

export const StyledContent = styled.View<{ isHiddenBottom?: boolean }>`
  width: 100%;
  padding-bottom: ${({ isHiddenBottom }) => (!isHiddenBottom ? 20 : 0)}px;
`;

export const StyledDatePickerWrap = styled.View`
  flex-flow: row wrap;
`;

export const StyledDatePicker = styled.View`
  flex: 1;
`;
