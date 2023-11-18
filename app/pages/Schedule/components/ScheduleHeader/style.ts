import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { colors } from "../../../../shared/styles/color";

export const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${getStatusBarHeight() + 5}px 10px 0 5px;
`;

export const StyledHeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledIcon = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border: solid 1px ${colors.borderDark};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export const StyledIconRefresh = styled.View`
  margin-left: 30px;
`;

export const StyledIconLeft = styled(StyledIcon)`
  margin-right: 14px;
`;

export const StyledIconCenter = styled(StyledIcon)`
  margin-right: 14px;
`;

export const StyledIconLeftInner = styled.View`
  margin-left: -3px;
`;

export const StyledIconRightInner = styled.View`
  margin-right: -3px;
`;

export const StyledHeaderTextWrap = styled.TouchableOpacity`
  display: block;
  margin-right: 20px;
`;

export const StyledText = styled.Text`
  font-size: 24px;
`;

export const StyledFilterWrap = styled.View`
  width: auto;
`;
