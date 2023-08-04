import { Dimensions } from "react-native";
import { styled } from "styled-components/native";

export const StyledWrap = styled.View`
  position: absolute;
  top: ${Dimensions.get("window").height - 170}px;
  right: 20px;
  z-index: 1;
  width: 100px;
`;
