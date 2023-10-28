import React, { FC } from "react";
import { Image as ImageOfRneui, ImageProps } from "@rneui/themed";

const ratio = {
  "16*9": 1.77777778,
  "1*1": 1,
};

interface Props extends ImageProps {
  ratioType?: keyof typeof ratio;
}

export const Image: FC<Props> = ({ ratioType = "1*1", ...props }) => {
  return (
    <ImageOfRneui
      {...props}
      style={{
        aspectRatio: ratio[ratioType],
        width: "100%",
      }}
      resizeMode="cover"
    />
  );
};
