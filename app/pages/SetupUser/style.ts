import styled from "styled-components/native";

export const StyledWrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
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
`;

export const StyledButton = styled.View`
  width: 80%;
`;
