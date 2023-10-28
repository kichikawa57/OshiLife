import { Avatar as _Avatar, AvatarProps } from "@rneui/themed";
import React, { FC } from "react";

interface Props extends AvatarProps {
  url: string;
}

export const Avatar: FC<Omit<Props, "source">> = ({ url, ...props }) => {
  return (
    <_Avatar
      {...props}
      source={{
        uri: url
          ? url
          : "https://odzswjxeygxhhnibrusv.supabase.co/storage/v1/object/public/oshis/person.png",
      }}
    />
  );
};
