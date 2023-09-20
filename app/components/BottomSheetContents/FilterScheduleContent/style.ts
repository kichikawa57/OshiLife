import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledSelectedImage = styled.TouchableOpacity`
  width: 40%;
  margin: 0 auto 20px;
`;

export const StyledSelectedImageInner = styled.View`
  width: 100%;
  padding-top: 100%;
  background-color: ${colors.bgDark};
`;

export const StyledContentWrap = styled.View`
  padding: 20px;
`;

export const StyledContent = styled.View<{ isHiddenBottom?: boolean }>`
  margin-bottom: ${({ isHiddenBottom }) => (!isHiddenBottom ? 20 : 0)}px;
`;
