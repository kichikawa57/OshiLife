import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";

export const StyledWrap = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${getStatusBarHeight() + 5}px;
`;
