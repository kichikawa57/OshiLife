import styled from "styled-components/native";

export const StyledWrap = styled.View`
  position: relative;
`;

export const StyledTouchable = styled.TouchableOpacity<{
  touchableWidth?: number;
  touchableHeight?: number;
  parentWidth: number;
  parentHeight: number;
}>`
  width: ${({ touchableWidth }) => (touchableWidth ? touchableWidth : 200)}%;
  height: ${({ touchableHeight }) => (touchableHeight ? touchableHeight : 200)}%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(
    -${({ parentWidth }) => parentWidth / 2}px,
    -${({ parentHeight }) => parentHeight / 2}px
  );
  z-index: 1;
`;
