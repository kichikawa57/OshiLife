import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { colors } from "../../../shared/styles/color";

export const StyledView = styled.View<{ isFullHeight: boolean; isStatusBar: boolean }>`
  width: 100%;
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: ${({ isStatusBar }) => (isStatusBar ? getStatusBarHeight() : 0)}px 20px 20px;

  ${({ isFullHeight }) =>
    isFullHeight &&
    css`
      justify-content: flex-start;
      flex: 1;
      background-color: #fff;
    `}
`;

export const StyledViewInner = styled.View<{ isFullHeight: boolean }>`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;

  ${({ isFullHeight }) =>
    isFullHeight &&
    css`
      padding: 20px 20px 0;
      background-color: #fff;
    `}
`;

export const StyledHeader = styled.View<{ headerPosition: "center" | "right" }>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ headerPosition }) =>
    headerPosition === "center" ? "space-between" : "flex-end"};
  width: 100%;
  margin-bottom: 40px;
`;

export const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

export const StyledContent = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #000;
`;

export const StyledTextButtonWrap = styled.TouchableOpacity`
  display: block;
`;

export const StyledTextButton = styled.Text`
  font-size: 14px;
  color: ${colors.textDark};
`;
