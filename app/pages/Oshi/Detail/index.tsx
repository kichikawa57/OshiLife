import React, { FC } from "react";
import { Modal } from "react-native";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfOshi } from "../../../router/app/Oshi/types";
import { Image } from "../../../components/Image";
import { Circle } from "../../../components/CircleForColor/Circle";
import { TrackButton } from "../../../components/TrackButton";
import { EditOshiContent } from "../../../components/BottomSheetContents/EditOshiContent";

import {
  ImageWrap,
  StyledContentsWrap,
  StyledWrap,
  StyledListWrap,
  StyledList,
  StyledListText,
  StyledCircle,
  StyledMemo,
} from "./style";
import { useOshiDetail } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"detail">;
};

export const Detail: FC<Props> = () => {
  const { control, clearErrors, isOpen, onPressCancel, onPressComplete, setIsOpen } =
    useOshiDetail();

  return (
    <>
      <Modal animationType="slide" presentationStyle="pageSheet" visible={isOpen}>
        <EditOshiContent
          control={control}
          isSelectedEdit={false}
          clearErrors={clearErrors}
          onPressEditColor={() => null}
          onPressComplete={onPressComplete}
          onPressCancel={onPressCancel}
        />
      </Modal>
      <StyledWrap>
        <StyledContentsWrap>
          <ImageWrap>
            <Image
              url="https://placehold.jp/30/dd6699/ffffff/300x150.png?text=placeholder+image"
              ratioType="16*9"
            />
          </ImageWrap>
          <StyledListWrap>
            <StyledList>
              <StyledListText>推しカラー</StyledListText>
              <StyledCircle>
                <Circle color="red" />
              </StyledCircle>
            </StyledList>
            <StyledList hiddenMerginBotton>
              <StyledListText>メモ</StyledListText>
              <StyledMemo>
                メモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ
              </StyledMemo>
            </StyledList>
          </StyledListWrap>
        </StyledContentsWrap>
        <TrackButton
          buttonText="編集"
          iconName="pencil"
          onPress={() => {
            setIsOpen(true);
          }}
        />
      </StyledWrap>
    </>
  );
};
