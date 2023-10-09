import React, { FC } from "react";

import { objectKeys } from "../../../shared/utils";
import { circleColors } from "../shared";
import { Circle } from "../Circle";

import { StyledCircle, StyledCircleWrap, StyledErrorText, StyledTitle, StyledWrap } from "./style";

type Props = {
  title?: string;
  selectColor: string;
  isSelectedEdit?: boolean;
  errorMessage?: string;
  onClick: (color: string) => void;
  onClickEdit?: () => void;
};

export const CircleList: FC<Props> = ({
  title,
  selectColor,
  errorMessage,
  isSelectedEdit,
  onClick,
  onClickEdit,
}) => {
  return (
    <StyledWrap>
      {title && <StyledTitle>{title}</StyledTitle>}
      <StyledCircleWrap>
        {objectKeys(circleColors).map((color, index) => (
          <StyledCircle key={index}>
            <Circle
              color={circleColors[color]}
              isSelected={!isSelectedEdit && selectColor === circleColors[color]}
              onPress={() => onClick(circleColors[color])}
            />
          </StyledCircle>
        ))}
        <StyledCircle>
          <Circle
            color={"#000"}
            isSelected={isSelectedEdit}
            isEdit={true}
            onPress={() => onClickEdit && onClickEdit()}
          />
        </StyledCircle>
      </StyledCircleWrap>
      {errorMessage && <StyledErrorText>{errorMessage}</StyledErrorText>}
    </StyledWrap>
  );
};
