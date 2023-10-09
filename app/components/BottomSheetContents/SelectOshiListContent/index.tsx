import React, { FC, Fragment, useRef, useState } from "react";
import { SearchBar } from "@rneui/base";
import { ActivityIndicator, LayoutAnimation } from "react-native";

import { ContentBase } from "../ContentBase";
import { ListItem } from "../../List";
import { ArtistId } from "../../../model/artists";

import { StyledContent, StyledListHeader, StyledScrollView } from "./style";
import { useSelectOshiListContent } from "./hooks";

type Props = {
  onPressCancel: () => void;
  onPressComplete: (id: ArtistId, name: string) => void;
};

export const SelectOshiListContent: FC<Props> = ({ onPressCancel, onPressComplete }) => {
  const { isLoading, artistsGroups, searchText, setSearchText, searchArtists, resetSearchArtists } =
    useSelectOshiListContent();
  const [isHideHeader, setIsHideHeader] = useState(false);
  const searchBarRef = useRef<SearchBar | null>(null);

  return (
    <ContentBase
      onPressCancel={onPressCancel}
      isStatusBar={true}
      isAbleToScroll={true}
      isHideHeader={isHideHeader}
      searchProps={{
        ref: searchBarRef,
        value: searchText,
        placeholder: "検索",
        showLoading: false,
        onClickClearIcon: () => {
          if (!searchBarRef.current) return;
          searchBarRef.current.clear();
          resetSearchArtists();
        },
        onChangeText: setSearchText,
        onFocus: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsHideHeader(true);
        },
        onSubmitEditing: () => {
          searchArtists();
        },
        onEndEditing: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsHideHeader(false);
        },
      }}
    >
      {!isLoading ? (
        <StyledContent>
          <StyledScrollView>
            {artistsGroups.map((group, index) => {
              const { name, artists } = group;

              return (
                <Fragment key={`SelectOshiListContent-${index}`}>
                  <StyledListHeader>{name}</StyledListHeader>
                  {artists.map((item, itemIndex) => {
                    return (
                      <ListItem
                        key={`SelectOshiListContent-${index}-${itemIndex}`}
                        title={item.name}
                        bottomDivider={true}
                        onPress={() => {
                          onPressComplete(item.id, item.name);
                        }}
                      />
                    );
                  })}
                </Fragment>
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
