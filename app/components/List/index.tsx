import React, { FC, ReactNode, useMemo } from "react";
import { Avatar, ListItem as ListItemOfRneui, ListItemProps } from "@rneui/themed";

import { Colors, colors } from "../../shared/styles/color";

interface Props extends ListItemProps {
  title: string;
  subTitle?: string;
  avatarUrl?: string;
  textColor?: Colors;
  bgColor?: Colors;
  rightContent?: ReactNode;
}

export const ListItem: FC<Props> = ({
  title,
  subTitle,
  avatarUrl,
  textColor,
  bgColor,
  rightContent,
  ...props
}) => {
  const listContent = useMemo(() => {
    return (
      <>
        {avatarUrl && (
          <Avatar rounded source={{ uri: avatarUrl }} containerStyle={{ marginRight: 10 }} />
        )}
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
      </>
    );
  }, [avatarUrl, subTitle, textColor, title]);

  const list = useMemo(() => {
    if (rightContent) {
      return (
        <ListItemOfRneui.Swipeable
          {...props}
          containerStyle={{ backgroundColor: colors[bgColor ? bgColor : "bgLight"] }}
          rightContent={rightContent}
        >
          {listContent}
        </ListItemOfRneui.Swipeable>
      );
    }

    return (
      <ListItemOfRneui
        {...props}
        containerStyle={{ backgroundColor: colors[bgColor ? bgColor : "bgLight"] }}
      >
        {listContent}
      </ListItemOfRneui>
    );
  }, [bgColor, listContent, props, rightContent]);

  return list;
};
