import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.View`
  flex: 1;
  width: 100%;
  position: relative;
`;

export const StyledContentsWrap = styled.ScrollView`
  width: 100%;
`;

export const ImageWrap = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const StyledListWrap = styled.View`
  width: 100%;
  padding: 0 20px;
`;

export const StyledList = styled.View<{ hiddenMerginBotton?: boolean }>`
  margin-bottom: ${(props) => (!props.hiddenMerginBotton ? 48 : 0)}px;
`;

export const StyledListText = styled.Text`
  margin-bottom: 16px;
  font-size: 20px;
  color: ${colors.textDark};
`;

export const StyledCircle = styled.View`
  width: 60px;
`;

export const StyledMemo = styled.Text`
  font-size: 14px;
  color: ${colors.textDark};
`;
