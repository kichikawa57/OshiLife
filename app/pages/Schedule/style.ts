import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.View`
  flex: 1;
  width: 100%;
`;

export const StyledTabView = styled.View`
  flex: 1;
  width: 100%;
`;

export const StyledCheckBox = styled.View`
  padding: 10px 0;
  border-bottom-color: ${colors.borderDark};
  border-bottom-width: 1px;
`;

export const StyledContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export const StyledText = styled.Text`
  font-size: 20px;
`;
