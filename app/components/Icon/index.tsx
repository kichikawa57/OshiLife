import React from "react";
import { Icon as IconOfRneui, IconProps } from "@rneui/themed";
import { FC } from "react";

import { IconName } from "../../shared/types/components/icon";

interface Props extends IconProps {
  name: IconName;
}

export const Icon: FC<Omit<Props, "type">> = (props) => {
  return <IconOfRneui {...props} type="font-awesome" />;
};
