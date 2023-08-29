import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${getStatusBarHeight() + 5}px 10px 0 5px;
`;

export const StyledHeaderTextWrap = styled.TouchableOpacity`
  display: block;
`;

export const StyledText = styled.Text`
  font-size: 24px;
`;

export const StyledFilterWrap = styled.TouchableOpacity`
  width: auto;
`;
