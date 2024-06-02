import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.View`
  width: 100%;
`;

export const StyledTitle = styled.Text`
  width: 100%;
  font-size: 16px;
  color: ${colors.textDark};
`;

export const StyledErrorText = styled.Text`
  width: 100%;
  font-size: 12px;
  color: ${colors.error};
`;

export const StyledInputWrap = styled.View`
  width: 100%;
  position: relative;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
