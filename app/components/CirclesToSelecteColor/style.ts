import styled from "styled-components/native";

import { colors } from "../../shared/styles/color";

export const StyledWrap = styled.View`
  width: 100%;
`;

export const StyledTitle = styled.Text`
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.textDark};
`;

const width = 100 + 5;
export const StyledCircleWrap = styled.View`
  flex-flow: row wrap;
  width: ${width}%;
  margin: 0 -2.5% 10px;
`;

export const StyledCircle = styled.TouchableOpacity`
  width: 16.6667%;
  height: 100%;
  padding: 0 2.5%;
`;

export const StyledCircleInner = styled.View<{ color: string; isSelected: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${(props) => props.color};
  border: solid 2px ${(props) => (props.isSelected ? colors.primary : props.color)};
  border-radius: 50px;
`;

export const StyledErrorText = styled.Text`
  margin-bottom: 20px;
  font-size: 12px;
  color: ${colors.error};
`;
