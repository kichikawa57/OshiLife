import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.ScrollView`
  width: 100%;
`;

export const StyledListWrap = styled.View`
  width: 100%;
  padding: 30px 20px;
`;

export const StyledList = styled.View<{ isHiddenMarginButtom?: boolean }>`
  width: 100%;
  margin-bottom: ${({ isHiddenMarginButtom }) => (!isHiddenMarginButtom ? 30 : 0)}px;
`;

export const StyledListTitle = styled.Text`
  width: 100%;
  margin-bottom: 10px;
  font-size: 14px;
  color: ${colors.textDark};
`;

export const StyledListTextWrap = styled.View`
  width: 100%;
`;

export const StyledListText = styled.Text`
  width: 100%;
  font-size: 18px;
  color: ${colors.textDark};
`;
