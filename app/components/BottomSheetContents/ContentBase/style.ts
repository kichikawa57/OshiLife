import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { colors } from "../../../shared/styles/color";

export const StyledView = styled.View<{ isFullHeight: boolean; isStatusBar: boolean }>`
  width: 100%;
  flex: 1;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding-top: ${({ isStatusBar }) => (isStatusBar ? getStatusBarHeight() : 0)}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  ${({ isFullHeight }) =>
    isFullHeight &&
    css`
      padding-left: 0;
      padding-right: 0;
      justify-content: flex-start;
      flex: 1;
      background-color: #fff;
    `}
`;

export const StyledViewInner = styled.View<{ isFullHeight: boolean }>`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding-top: 20px;

  ${({ isFullHeight }) =>
    isFullHeight &&
    css`
      padding-top: 0;
      padding-bottom: 20px;
      background-color: #fff;
    `}
`;

export const StyledHeaderWrap = styled.View`
  width: 100%;
  padding: 0 20px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.borderDarkSecondary};
`;

export const StyledHeader = styled.View<{
  headerPosition: "center" | "right";
  isDisplaySearch: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ headerPosition }) =>
    headerPosition === "center" ? "space-between" : "flex-end"};
  width: 100%;
  padding-bottom: ${({ isDisplaySearch }) => (isDisplaySearch ? 16 : 0)}px;
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
