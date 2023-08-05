import React, { FC, ReactNode } from "react";
import { TabView as TabViewOfRneui } from "@rneui/themed";

type Props = {
  children: ReactNode;
};

export const TabItem: FC<Props> = ({ children }) => {
  return <TabViewOfRneui.Item style={{ width: "100%" }}>{children}</TabViewOfRneui.Item>;
};
