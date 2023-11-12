import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.View`
  width: 100%;
  padding-top: ${getStatusBarHeight()}px;
  background-color: ${colors.bgLight};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderDarkSecondary};
  position: relative;
  z-index: 1;
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

export const StyledLeft = styled.View`
  width: 20%;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const StyledRight = styled.View`
  width: 20%;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

export const StyledCenter = styled.View`
  width: 60%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const StyledTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.textDark};
`;
