import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.View`
  width: 100%;
  padding-top: ${getStatusBarHeight()}px;
  background-color: ${colors.bgLight};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderDarkSecondary};
`;

export const StyledInner = styled.View`
  width: 100%;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 0 20px;
`;

export const StyledSpare = styled.View`
  display: block;
`;

export const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.textDark};
`;
