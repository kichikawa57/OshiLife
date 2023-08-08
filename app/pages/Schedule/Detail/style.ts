import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.ScrollView`
  width: 100%;
`;

export const StyledInner = styled.View`
  width: 100%;
  padding: 20px;
`;

export const StyledTitle = styled.Text`
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: 700;
  color: ${colors.textDark};
`;

export const StyledDate = styled.Text`
  margin-bottom: 32px;
  font-size: 14px;
  color: ${colors.textDark};
`;

export const StyledSwitch = styled.View`
  width: 100%;
  margin-bottom: 32px;
`;

export const MemoWrap = styled.View`
  width: 100%;
`;

export const MemoTitle = styled.Text`
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 700;
  color: ${colors.textDark};
`;

export const Memo = styled.Text`
  margin-bottom: 24px;
  font-size: 14px;
  color: ${colors.textDark};
`;
