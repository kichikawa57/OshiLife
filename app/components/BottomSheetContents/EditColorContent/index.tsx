import React, { FC, useState } from "react";
import tinycolor from "tinycolor2";

import { ContentBase } from "../ContentBase";
import { ColorPicker } from "../../ColorPicker";
import { HsvColor } from "../../ColorPicker/util";

import { StyledContent } from "./style";

type Props = {
  color: string;
  onPressCancel: () => void;
  onPressComplete: (color: string) => void;
};

export const EditColorContent: FC<Props> = ({ color, onPressCancel, onPressComplete }) => {
  const [selectedColor, setSelectedColor] = useState<HsvColor>(() => {
    if (color !== "") {
      return tinycolor(color).toHsv();
    }

    return { h: 0, s: 1, v: 1 };
  });

  return (
    <ContentBase
      onPressCancel={onPressCancel}
      isAbleToScroll={false}
      isStatusBar={true}
      onPressComplete={() => {
        onPressComplete(tinycolor(selectedColor).toHexString());
      }}
    >
      <StyledContent>
        <ColorPicker
          state={{
            color: selectedColor,
            setColor: setSelectedColor,
          }}
          onColorSelected={(color) => {
            onPressComplete(color);
          }}
        />
      </StyledContent>
    </ContentBase>
  );
};
