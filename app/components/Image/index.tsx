import React, { FC } from "react";
import { Image as ImageOfRneui, ImageProps } from "@rneui/themed";

const ratio = {
  "16*9": 1.77777778,
  "1*1": 1,
};

interface Props extends ImageProps {
  url: string;
  ratioType?: keyof typeof ratio;
}

export const Image: FC<Omit<Props, "source">> = ({ url, ratioType = "1*1", ...props }) => {
  return (
    <ImageOfRneui
      {...props}
      source={{ uri: url }}
      style={{
        aspectRatio: ratio[ratioType],
        width: "100%",
      }}
      resizeMode="cover"
    />
  );
};
