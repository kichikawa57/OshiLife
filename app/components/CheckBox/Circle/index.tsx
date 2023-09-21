import React, { FC } from "react";
import { CheckBox } from "@rneui/base";

type Props = {
  title: string;
  checked: boolean;
  onPress: () => void;
};

export const CircleCheckBox: FC<Props> = (props) => {
  return (
    <CheckBox
      {...props}
      center
      containerStyle={{
        backgroundColor: "transparent",
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
      textStyle={{
        marginRight: 0,
      }}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
    />
  );
};
