import styled from "styled-components/native";
import { Animated } from "react-native";

export const StyledView = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StyledDrawerView = styled(Animated.View)`
  background-color: #ccc;
  width: 80%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const StyledText = styled.Text`
  font-size: 20px;
`;
