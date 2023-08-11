import { Dimensions } from "react-native";
import { styled } from "styled-components/native";

export const StyledWrap = styled.View<{ isHiddenHeader: boolean }>`
  position: absolute;
  top: ${({ isHiddenHeader }) =>
    !isHiddenHeader
      ? Dimensions.get("window").height - 170
      : Dimensions.get("window").height - 100}px;
  right: 20px;
  z-index: 1;
  width: 100px;
`;
