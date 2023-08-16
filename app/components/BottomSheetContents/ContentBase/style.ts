import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledView = styled.View`
  flex: 1;
  width: 100%;
  padding: 10px 20px 0;
`;

export const StyledHeader = styled.View<{ headerPosition: "center" | "right" }>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ headerPosition }) =>
    headerPosition === "center" ? "space-between" : "flex-end"};
  width: 100%;
  margin-bottom: 40px;
`;

export const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

export const StyledTextButtonWrap = styled.TouchableOpacity`
  display: block;
`;

export const StyledTextButton = styled.Text`
  font-size: 14px;
  color: ${colors.textDark};
`;
