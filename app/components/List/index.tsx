import React, { FC } from "react";
import { Avatar, ListItem as ListItemOfRneui, ListItemProps } from "@rneui/themed";

import { Colors, colors } from "../../shared/styles/color";

interface Props extends ListItemProps {
  title: string;
  subTitle?: string;
  avatarUrl?: string;
  textColor?: Colors;
  bgColor?: Colors;
}

export const ListItem: FC<Props> = ({
  title,
  subTitle,
  avatarUrl,
  textColor,
  bgColor,
  ...props
}) => {
  return (
    <ListItemOfRneui
      {...props}
      containerStyle={{ backgroundColor: colors[bgColor ? bgColor : "bgLight"] }}
    >
      {avatarUrl && <Avatar rounded source={{ uri: avatarUrl }} />}
      <ListItemOfRneui.Content>
        <ListItemOfRneui.Title
          style={{ color: colors[textColor ? textColor : "textDark"], fontWeight: "bold" }}
        >
          {title}
        </ListItemOfRneui.Title>
        {subTitle && (
          <ListItemOfRneui.Subtitle style={{ color: colors[textColor ? textColor : "textDark"] }}>
            {subTitle}
          </ListItemOfRneui.Subtitle>
        )}
      </ListItemOfRneui.Content>
      <ListItemOfRneui.Chevron color={colors[textColor ? textColor : "textDark"]} />
    </ListItemOfRneui>
  );
};
