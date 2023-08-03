import React from "react";
import { FC } from "react";

import {
  StyledCircle,
  StyledCircleInner,
  StyledCircleWrap,
  StyledErrorText,
  StyledTitle,
  StyledWrap,
} from "./style";

type MainColors = "red" | "blue" | "yellow" | "green" | "black" | "pink";
const mainColors: MainColors[] = ["red", "blue", "yellow", "green", "black", "pink"];

type Props = {
  title: string;
  selectColor: string;
  errorMessage?: string;
  onClick: (color: string) => void;
};

const getColor = (type: MainColors) => {
  switch (type) {
    case "black":
      return "#000";

    case "blue":
      return "#0000ff";

    case "red":
      return "#ff0000";

    case "yellow":
      return "#ff0";

    case "green":
      return "#008000";

    case "pink":
      return "#ffc0cb";

    default:
      return "#000";
  }
};

export const CirclesToSelecteColor: FC<Props> = ({ title, selectColor, errorMessage, onClick }) => {
  return (
    <StyledWrap>
      <StyledTitle>{title}</StyledTitle>
      <StyledCircleWrap>
        {mainColors.map((mainColor, index) => (
          <StyledCircle key={index} onPress={() => onClick(getColor(mainColor))}>
            <StyledCircleInner
              color={getColor(mainColor)}
              isSelected={selectColor === getColor(mainColor)}
            />
          </StyledCircle>
        ))}
      </StyledCircleWrap>
      {errorMessage && <StyledErrorText>{errorMessage}</StyledErrorText>}
    </StyledWrap>
  );
};
