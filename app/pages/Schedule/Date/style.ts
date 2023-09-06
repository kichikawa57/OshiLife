import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.View`
  width: 100%;
  flex: 1;
`;

export const StyledScrollViewWrap = styled.View`
  width: 100%;
  flex: 1;
`;

export const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

export const StyledScrollViewInner = styled.View`
  width: 100%;
  padding: 20px 20px 0;
`;

export const StyledCheckBox = styled.View`
  padding: 10px 0;
  border-bottom-color: ${colors.borderDark};
  border-bottom-width: 1px;
`;
