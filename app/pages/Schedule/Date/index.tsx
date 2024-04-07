import React, { FC } from "react";
import { Alert } from "react-native";
import dayjs from "dayjs";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { CheckBoxGroup } from "../../../components/CheckBox/Group";
import { ListItem } from "../../../components/List";
import { TrackButton } from "../../../components/TrackButton";
import { Button } from "../../../components/Button";
import { Loading } from "../../../components/Loading";
import { oshiId } from "../../../model/oshis";
import { artistId } from "../../../model/artists";
import { yyyymmddhhmmss } from "../../../shared/constants/date/dayJs";
import { Header } from "../../../components/Header/Normal";

import {
  StyledCheckBox,
  StyledEmpty,
  StyledEmptyText,
  StyledScrollView,
  StyledScrollViewInner,
  StyledScrollViewWrap,
  StyledWrap,
} from "./style";
import { useScheduleDate } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"appSchedule">;
  scheduleRoute: RoutingPropsOfSchedule<"appScheduleDate">;
};

export const Date: FC<Props> = ({ scheduleRoute }) => {
  const params = scheduleRoute.route.params;

  const {
    isExisted,
    scheduleData,
    isLoading,
    checkBoxItems,
    getArtistOfOshiById,
    deleteScheduleMutation,
  } = useScheduleDate(params.date, params.calendarType);

  return (
    <>
      <Header
        title={dayjs(params.date).format("YYYY年MM月DD日")}
        onPressLeft={() => {
          scheduleRoute.navigation.goBack();
        }}
      />
      <StyledWrap>
        {isExisted && (
          <StyledCheckBox>
            <CheckBoxGroup>{checkBoxItems}</CheckBoxGroup>
          </StyledCheckBox>
        )}
        <StyledScrollViewWrap>
          {isLoading ? (
            <Loading />
          ) : scheduleData.length !== 0 ? (
            <StyledScrollView>
              <StyledScrollViewInner>
                {scheduleData.map((Schedule, index) => (
                  <ListItem
                    key={index}
                    title={Schedule.title}
                    onPress={() => {
                      scheduleRoute.navigation.navigate("appScheduleDetail", {
                        id: Schedule.id,
                        oshiId: Schedule.oshi_id,
                        oshiName: getArtistOfOshiById(Schedule.artist_id)?.name || "",
                        artistId: Schedule.artist_id,
                        connectedScheduleId: Schedule.connected_schedule_id,
                        title: Schedule.title,
                        startDate: Schedule.start_at,
                        endDate: Schedule.end_at,
                        date: params.date,
                        isPublic: Schedule.is_public,
                        calendarType: params.calendarType,
                        memo: Schedule.memo ? Schedule.memo : "",
                      });
                    }}
                    avatarUrl={getArtistOfOshiById(Schedule.artist_id)?.imageUrl || ""}
                    bottomDivider={scheduleData.length + 1 !== index}
                    rightContent={
                      params.calendarType === "me" && (
                        <Button
                          title="Delete"
                          disabled={deleteScheduleMutation.isPending}
                          onPress={() =>
                            Alert.alert("本当に削除してよろしいでしょうか？", "", [
                              {
                                text: "キャンセル",
                                onPress: () => console.log("User pressed No"),
                                style: "cancel",
                              },
                              {
                                text: "確定",
                                onPress: () => {
                                  deleteScheduleMutation.mutate({ id: Schedule.id });
                                },
                              },
                            ])
                          }
                          iconName="trash-o"
                          buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                        />
                      )
                    }
                  />
                ))}
              </StyledScrollViewInner>
            </StyledScrollView>
          ) : (
            <StyledEmpty>
              <StyledEmptyText>スケジュールはありません</StyledEmptyText>
            </StyledEmpty>
          )}
        </StyledScrollViewWrap>
        {params.calendarType === "me" && (
          <TrackButton
            buttonText="予定追加"
            iconName="plus"
            onPress={() => {
              scheduleRoute.navigation.navigate("appScheduleEdit", {
                id: null,
                oshiId: oshiId(""),
                artistId: artistId(""),
                date: params.date,
                connectedScheduleId: null,
                oshiName: "",
                endDate: dayjs(params.date).endOf("day").format(yyyymmddhhmmss),
                startDate: params.date,
                title: "",
                memo: "",
                isPublic: true,
                calendarType: params.calendarType,
              });
            }}
          />
        )}
      </StyledWrap>
    </>
  );
};
