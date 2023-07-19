import styled from "styled-components/native";
import { Animated } from "react-native";

export const StyledView = styled(Animated.View)`
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledDrawerView = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 100%;
  background-color: #ccc;
`;

export const StyledText = styled.Text`
  font-size: 20px;
`;
