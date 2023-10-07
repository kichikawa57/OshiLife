import React, { FC, ReactNode, RefObject, useMemo } from "react";
import { SearchBar } from "@rneui/base";

import { colors } from "../../../shared/styles/color";
import { Icon } from "../../Icon";

import {
  StyledHeader,
  StyledHeaderWrap,
  StyledScrollView,
  StyledTextButton,
  StyledTextButtonWrap,
  StyledView,
  StyledViewInner,
} from "./style";

type SearchProps = {
  ref: RefObject<SearchBar | null>;
  value: string;
  placeholder: string;
  showLoading: boolean;
  onChangeText: (value: string) => void;
  onFocus: () => void;
  onEndEditing: () => void;
  onClickClearIcon: () => void;
  onSubmitEditing: () => void;
};

type Props = {
  children: ReactNode;
  headerPosition?: "center" | "right";
  isAbleToScroll?: boolean;
  isCenter?: boolean;
  isFullHeight?: boolean;
  isStatusBar?: boolean;
  searchProps?: SearchProps;
  isHideHeader?: boolean;
  onPressCancel?: () => void;
  onPressComplete?: () => void;
};

export const ContentBase: FC<Props> = ({
  children,
  headerPosition = "center",
  isAbleToScroll = true,
  isFullHeight = true,
  isStatusBar = false,
  isCenter,
  searchProps,
  isHideHeader,
  onPressCancel,
  onPressComplete,
}) => {
  const search = useMemo(() => {
    if (!searchProps) return;

    const { ref, onClickClearIcon, ...props } = searchProps;

    return (
      <SearchBar
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        containerStyle={{
          paddingTop: 0,
          paddingBottom: 0,
        }}
        platform="ios"
        autoCapitalize="none"
        loadingProps={{
          size: 12,
        }}
        leftIconContainerStyle={{ height: 20 }}
        cancelButtonProps={{
          buttonTextStyle: {
            fontSize: 12,
            color: colors.secondary,
          },
        }}
        searchIcon={<Icon name="search" size={12} />}
        clearIcon={<Icon name="close" size={12} onPress={onClickClearIcon} />}
        cancelButtonTitle="キャンセル"
        inputContainerStyle={{
          backgroundColor: "#fff",
          maxHeight: 30,
          borderTopColor: "#70706e",
          borderBottomColor: "#70706e",
          borderLeftColor: "#70706e",
          borderRightColor: "#70706e",
          borderWidth: 1,
          marginLeft: 0,
          borderBottomWidth: 1,
          borderRadius: 4,
        }}
        inputStyle={{ fontSize: 12 }}
      />
    );
  }, [searchProps]);

  return (
    <StyledView isFullHeight={isFullHeight} isStatusBar={isStatusBar}>
      <StyledViewInner isFullHeight={isFullHeight}>
        <StyledHeaderWrap>
          {!isHideHeader && (
            <StyledHeader headerPosition={headerPosition} isDisplaySearch={!!search}>
              {onPressCancel ? (
                <StyledTextButtonWrap>
                  <StyledTextButton onPress={onPressCancel}>キャンセル</StyledTextButton>
                </StyledTextButtonWrap>
              ) : (
                <></>
              )}
              {onPressComplete ? (
                <StyledTextButtonWrap>
                  <StyledTextButton onPress={onPressComplete}>完了</StyledTextButton>
                </StyledTextButtonWrap>
              ) : (
                <></>
              )}
            </StyledHeader>
          )}
          {search && search}
        </StyledHeaderWrap>
        <StyledScrollView
          scrollEnabled={isAbleToScroll}
          contentContainerStyle={
            !isAbleToScroll &&
            isCenter && { justifyContent: "center", alignItems: "center", flex: 1 }
          }
        >
          {children}
        </StyledScrollView>
      </StyledViewInner>
    </StyledView>
  );
};
