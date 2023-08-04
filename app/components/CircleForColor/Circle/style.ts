import styled from "styled-components/native";

import { colors } from "../../../shared/styles/color";

export const StyledWrap = styled.TouchableOpacity<{
  color: string;
  isSelected: boolean;
  isPress: boolean;
}>`
  width: 100%;
  aspect-ratio: 1;
  pointer-events: ${(props) => (props.isPress ? "auto" : "none")};
  background-color: ${(props) => props.color};
  border: solid 2px ${(props) => (props.isSelected ? colors.primary : props.color)};
  border-radius: 50px;
`;
