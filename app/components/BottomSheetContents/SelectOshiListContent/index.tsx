import React, { FC } from "react";
import { ActivityIndicator } from "react-native";

import { ContentBase } from "../ContentBase";
import { ListItem } from "../../List";
import { OshiId } from "../../../model/oshis";
import { ArtistId } from "../../../model/artists";

import { StyledContent, StyledScrollView } from "./style";
import { useSelectArtistListContent } from "./hooks";

type Props = {
  onPressCancel: () => void;
  onPressComplete: (artistId: ArtistId, oshiId: OshiId, name: string) => void;
};

export const SelectOshiListContent: FC<Props> = ({ onPressCancel, onPressComplete }) => {
  const { isLoading, oshis } = useSelectArtistListContent();

  return (
    <ContentBase onPressCancel={onPressCancel} isStatusBar={true} isAbleToScroll={true}>
      {!isLoading ? (
        <StyledContent>
          <StyledScrollView>
            {oshis.map((oshi, index) => {
              const { artists, image_url, id, artist_id } = oshi;

              return (
                <ListItem
                  key={`SelectOshiListContent-${index}`}
                  avatarUrl={image_url || ""}
                  title={artists?.name || ""}
                  bottomDivider={true}
                  onPress={() => {
                    onPressComplete(artist_id, id, artists?.name || "");
                  }}
                />
              );
            })}
          </StyledScrollView>
        </StyledContent>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ContentBase>
  );
};
