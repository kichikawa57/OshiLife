import React, { FC, useCallback } from "react";
import { Tab, TabProps } from "@rneui/themed";

import { colors } from "../../../shared/styles/color";

import { StyledWrap } from "./style";

interface Props extends TabProps {
  list: string[];
  type?: "border" | "panel";
  onClick: (index: number) => void;
}

export const TabList: FC<Omit<Props, "ref">> = ({ list, type = "border", onClick, ...props }) => {
  const item = useCallback(
    (text: string, index: number) => {
      switch (type) {
        case "border":
          return (
            <Tab.Item
              key={index}
              title={text}
              containerStyle={{
                borderBottomWidth: 1,
                borderBottomColor: props.value === index ? colors.secondary : colors.bgLight,
              }}
              titleStyle={{
                fontSize: 12,
                color: props.value === index ? colors.secondary : colors.textDark,
              }}
            />
          );

        case "panel":
          return (
            <Tab.Item
              key={index}
              title={text}
              dense
              containerStyle={{
                backgroundColor: props.value === index ? colors.secondary : colors.bgLight,
                borderRadius: 6,
              }}
              titleStyle={{
                fontSize: 12,
                color: props.value === index ? colors.textLight : colors.textDark,
              }}
            />
          );
      }
    },
    [props.value, type],
  );

  return (
    <StyledWrap isPanel={type === "panel"}>
      <Tab
        value={props.value}
        onChange={(index) => onClick(index)}
        containerStyle={{
          backgroundColor: colors.bgLight,
        }}
        disableIndicator
      >
        {list.map(item)}
      </Tab>
    </StyledWrap>
  );
};
