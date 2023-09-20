import React, { FC, useState } from "react";
import dayjs from "dayjs";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { SwitchList } from "../../../components/Switch/List";
import { TrackButton } from "../../../components/TrackButton";

import {
  Memo,
  MemoTitle,
  MemoWrap,
  StyledDate,
  StyledInner,
  StyledSwitch,
  StyledTitle,
  StyledWrap,
} from "./style";
type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"detail">;
};

export const Detail: FC<Props> = ({ scheduleRoute }) => {
  const [isChack, setIsCheck] = useState(false);

  return (
    <>
      <StyledWrap>
        <StyledInner>
          <StyledTitle>記事のタイトル</StyledTitle>
          <StyledDate>日時: 01月01日 ~ 01月03日 09:00</StyledDate>
          <StyledSwitch>
            <SwitchList
              text="自分のカレンダーに登録する"
              switchProps={{
                value: isChack,
                onChange: () => {
                  setIsCheck(!isChack);
                },
              }}
            />
          </StyledSwitch>
          <MemoWrap>
            <MemoTitle>メモ</MemoTitle>
            <Memo>
              メモメモメモメモメモメモメモメモメモ メモメモメモメモメモメモメモメモメモ
              メモメモメメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモ
            </Memo>
          </MemoWrap>
        </StyledInner>
      </StyledWrap>
      <TrackButton
        buttonText="編集"
        iconName="pencil"
        onPress={() => {
          scheduleRoute.navigation.navigate("edit", {
            id: "id-01",
            title: "記事のタイトル",
            date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            oshiName: "川村壱馬",
            memo: "メモメモメモメモメモメモメモメモメモ メモメモメモメモメモメモメモメモメモメモメモメメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメモメメモメモメモメモメモメモメモメモメモメモメモ",
          });
        }}
      />
    </>
  );
};
