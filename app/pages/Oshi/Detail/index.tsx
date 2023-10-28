import React, { FC } from "react";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfOshi } from "../../../router/app/Oshi/types";
import { Image } from "../../../components/Image";
import { Circle } from "../../../components/CircleForColor/Circle";
import { TrackButton } from "../../../components/TrackButton";
import { Header } from "../../../components/Header/Normal";

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

export const Detail: FC<Props> = ({ oshiRoute }) => {
  const params = oshiRoute.route.params;

  return (
    <>
      <Header
        title={params.name}
        onPressLeft={() => {
          oshiRoute.navigation.goBack();
        }}
      />
      <StyledWrap>
        <StyledContentsWrap>
          <ImageWrap>
            <Image
              source={params.image ? { uri: params.image } : require("../../../images/person.png")}
              ratioType="1*1"
            />
          </ImageWrap>
          <StyledListWrap>
            <StyledList>
              <StyledListText>推しカラー</StyledListText>
              <StyledCircle>
                <Circle color={params.color} />
              </StyledCircle>
            </StyledList>
            {params.memo && (
              <StyledList hiddenMerginBotton>
                <StyledListText>メモ</StyledListText>
                <StyledMemo>{params.memo}</StyledMemo>
              </StyledList>
            )}
          </StyledListWrap>
        </StyledContentsWrap>
        <TrackButton
          buttonText="編集"
          iconName="pencil"
          onPress={() => {
            oshiRoute.navigation.navigate("edit", {
              id: params.id,
              name: params.name,
              artistId: params.artistId,
              color: params.color,
              memo: params.memo,
              isEditColor: params.isEditColor,
            });
          }}
        />
      </StyledWrap>
    </>
  );
};
