import React, { FC, ReactNode } from "react";
import { TabView as TabViewOfRneui } from "@rneui/themed";

type Props = {
  value: number;
  onChange: (index: number) => void;
  children: ReactNode;
};

export const TabView: FC<Props> = ({ value, children, onChange }) => {
  return (
    <TabViewOfRneui value={value} onChange={onChange} animationType="spring">
      {children}
    </TabViewOfRneui>
  );
};
