import React, { FC, Fragment, useRef, useState } from "react";
import { SearchBar } from "@rneui/base";
import { LayoutAnimation } from "react-native";

import { ContentBase } from "../ContentBase";
import { ListItem } from "../../List";

import { StyledContent, StyledListHeader, StyledScrollView } from "./style";

type OshiListData = {
  id: string;
  name: string;
  imageUrl: string;
};

type OshiList = {
  label: string;
  list: OshiListData[];
};

type Props = {
  oshiList: OshiList[];
  onPressCancel: () => void;
  onPressComplete: (id: string, name: string) => void;
};

export const SelectOshiListContent: FC<Props> = ({ oshiList, onPressCancel, onPressComplete }) => {
  const [search, setSearch] = useState("");
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
        value: search,
        placeholder: "検索",
        showLoading: false,
        onClickClearIcon: () => {
          if (!searchBarRef.current) return;
          searchBarRef.current.clear();
        },
        onChangeText: setSearch,
        onFocus: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsHideHeader(true);
        },
        onEndEditing: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIsHideHeader(false);
        },
      }}
    >
      <StyledContent>
        <StyledScrollView>
          {oshiList.map((oshi, index) => {
            const { label, list } = oshi;

            return (
              <Fragment key={`SelectOshiListContent-${index}`}>
                <StyledListHeader>{label}</StyledListHeader>
                {list.map((item, itemIndex) => {
                  return (
                    <ListItem
                      key={`SelectOshiListContent-${index}-${itemIndex}`}
                      title={item.name}
                      avatarUrl={item.imageUrl}
                      bottomDivider={list.length - 1 !== itemIndex}
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
    </ContentBase>
  );
};
