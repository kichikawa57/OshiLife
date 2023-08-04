import React, { FC } from "react";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfOshi } from "../../../router/app/Oshi/types";
import { Image } from "../../../components/Image";
import { Circle } from "../../../components/CircleForColor/Circle";
import { TrackButton } from "../../../components/TrackButton";

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

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"detail">;
};

export const Detail: FC<Props> = () => {
  return (
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
      <TrackButton buttonText="編集" iconName="pencil" />
    </StyledWrap>
  );
};
