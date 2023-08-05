import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.TouchableOpacity<{ isMarginRight: boolean }>`
  margin-right: ${(props) => (props.isMarginRight ? 16 : 0)}px;
`;

export const StyledInner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border: solid 1px ${colors.borderDark};
  border-radius: 10px;
`;

export const StyledIcon = styled.View`
  margin-right: 4px;
`;

export const StyledAvatar = styled.View`
  margin-right: 6px;
`;

export const StyledName = styled.Text`
  font-size: 12px;
  color: ${colors.textDark};
`;
