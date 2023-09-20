import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledContent = styled.View<{ isHiddenBottom?: boolean }>`
  width: 100%;
  padding-bottom: ${({ isHiddenBottom }) => (!isHiddenBottom ? 20 : 0)}px;
`;

export const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

export const StyledListHeader = styled.Text`
  width: 100%;
  padding: 2px 20px;
  font-size: 12px;
  background-color: ${colors.bgDark};
  color: ${colors.textLight};
`;
