import React, { FC } from "react";
import { Switch, SwitchProps } from "@rneui/themed";

// interface Props extends SwitchProps {}

export const SwitchItem: FC<SwitchProps> = (props) => {
  return <Switch {...props} />;
};
