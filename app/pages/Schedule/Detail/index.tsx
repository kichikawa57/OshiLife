import React, { FC } from "react";
import dayjs from "dayjs";
import { Alert } from "react-native";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { TrackButton } from "../../../components/TrackButton";
import { DEFAULT_MESSAGE } from "../../../api";
import { Button } from "../../../components/Button";

import {
  Memo,
  MemoTitle,
  MemoWrap,
  StyledButton,
  StyledButtonWrap,
  StyledDate,
  StyledInner,
  StyledTitle,
  StyledWrap,
} from "./style";
import { useScheduleDetail } from "./hooks";
type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"detail">;
};

export const Detail: FC<Props> = ({ scheduleRoute }) => {
  const params = scheduleRoute.route.params;

  const { onPressConnectedButton, isLoading, isConnected, onPressUnConnectedButtonForMe } =
    useScheduleDetail(scheduleRoute, params);

  if (!params) {
    Alert.alert(DEFAULT_MESSAGE);
    scheduleRoute.navigation.goBack();
    return <></>;
  }

  return (
    <>
      <StyledWrap>
        <StyledInner>
          <StyledTitle>{params.title}</StyledTitle>
          <StyledDate>{`日時: ${dayjs(params.startDate).format("MM月DD日 HH:mm")} ~ ${dayjs(
            params.endDate,
          ).format("MM月DD日 HH:mm")}`}</StyledDate>
          {params.memo && (
            <MemoWrap>
              <MemoTitle>メモ</MemoTitle>
              <Memo>{params.memo}</Memo>
            </MemoWrap>
          )}
        </StyledInner>
      </StyledWrap>
      {params.calendarType === "others" && (
        <StyledButtonWrap>
          <StyledButton>
            <Button
              disabled={isLoading}
              title={!isConnected ? "自分のカレンダーに登録する" : "自分のカレンダーから登録削除"}
              onPress={() => onPressConnectedButton()}
              textColor={!isConnected ? "textLight" : "primary"}
              backgroundColor={!isConnected ? "primary" : "bgLight"}
              borderColor={"primary"}
            />
          </StyledButton>
        </StyledButtonWrap>
      )}
      {params.calendarType === "me" && params.connectedScheduleId !== null && (
        <StyledButtonWrap>
          <StyledButton>
            <Button
              disabled={isLoading}
              title={"自分のカレンダーから登録削除"}
              onPress={() => onPressUnConnectedButtonForMe()}
              textColor={"primary"}
              backgroundColor={"bgLight"}
              borderColor={"primary"}
            />
          </StyledButton>
        </StyledButtonWrap>
      )}
      {params.calendarType === "me" && params.connectedScheduleId === null && (
        <TrackButton
          buttonText="編集"
          iconName="pencil"
          onPress={() => {
            scheduleRoute.navigation.navigate("edit", {
              ...params,
            });
          }}
        />
      )}
    </>
  );
};
