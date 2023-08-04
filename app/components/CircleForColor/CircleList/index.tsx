import React from "react";
import { FC } from "react";

import { objectKeys } from "../../../shared/utils";
import { circleColors } from "../shared";
import { Circle } from "../Circle";

import { StyledCircle, StyledCircleWrap, StyledErrorText, StyledTitle, StyledWrap } from "./style";

type Props = {
  title: string;
  selectColor: string;
  errorMessage?: string;
  onClick: (color: string) => void;
};

export const CircleList: FC<Props> = ({ title, selectColor, errorMessage, onClick }) => {
  return (
    <StyledWrap>
      <StyledTitle>{title}</StyledTitle>
      <StyledCircleWrap>
        {objectKeys(circleColors).map((color, index) => (
          <StyledCircle key={index}>
            <Circle
              color={color}
              isSelected={selectColor === circleColors[color]}
              onPress={() => onClick(circleColors[color])}
            />
          </StyledCircle>
        ))}
      </StyledCircleWrap>
      {errorMessage && <StyledErrorText>{errorMessage}</StyledErrorText>}
    </StyledWrap>
  );
};
