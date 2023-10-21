import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.View`
  flex: 1;
  width: 100%;
`;

export const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 25px 0 0;
`;

export const StyledTabList = styled.View`
  width: 100%;
  padding: 10px 0;
`;

export const StyledTabView = styled.View`
  flex: 1;
  width: 100%;
`;

export const StyledCheckBox = styled.View`
  border-bottom-color: ${colors.borderDark};
  border-bottom-width: 1px;
`;

export const StyledContent = styled.View`
  flex: 1;
  width: 100%;
`;

export const StyledBg = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.bgDark};
`;

export const StyledHeaderTextWrap = styled.TouchableOpacity`
  display: block;
`;

export const BottomSheetInner = styled.View`
  width: 100%;
  background-color: ${colors.bgLight};
`;

export const StyledText = styled.Text`
  font-size: 24px;
`;
