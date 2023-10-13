import React, { FC, useState } from "react";
import { Modal } from "react-native";
import dayjs from "dayjs";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { TabView } from "../../components/Tab/View";
import { TabItem } from "../../components/Tab/View/Item";
import { Calendar } from "../../components/Calendar";
import { TrackButton } from "../../components/TrackButton";
import { FilterScheduleContent } from "../../components/BottomSheetContents/FilterScheduleContent";
import { EditDateContent } from "../../components/BottomSheetContents/EditDateContent";
import { Loading } from "../../components/Loading";
import { oshiId } from "../../model/oshis";
import { artistId } from "../../model/artists";

import { ScheduleHeader } from "./components/ScheduleHeader";
import { StyledContent, StyledTabView, StyledWrap } from "./style";
import { useSchedule } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"top">;
};

export const Schedule: FC<Props> = ({ scheduleRoute }) => {
  const [dateType, setDateType] = useState(0);
  const {
    onPressDate,
    isLoading,
    editDateContent,
    filetrContent,
    schedulesForMe,
    schedulesForOthers,
    calendarTypeIndex,
    setCalendarTypeIndex,
    onPressNextButton,
    onPressPrevButton,
    onPressCurrentDate,
  } = useSchedule(scheduleRoute);

  return (
    <>
      <Modal animationType="fade" visible={editDateContent.isOpenDate} transparent={true}>
        <EditDateContent
          currentDate={editDateContent.currentDate}
          onPressCancel={editDateContent.onPressCancelForDate}
          onPressComplete={editDateContent.onPressCompleteForDate}
        />
      </Modal>
      <Modal animationType="fade" visible={filetrContent.isOpenFilter} transparent={true}>
        <FilterScheduleContent
          dateType={dateType}
          setDateType={setDateType}
          calendarType={calendarTypeIndex}
          setCalendarType={setCalendarTypeIndex}
          onPressCancel={() => filetrContent.setIsOpenFilter(false)}
        />
      </Modal>
      <ScheduleHeader
        currentDate={editDateContent.currentDate}
        onPressNextButton={onPressNextButton}
        onPressPrevButton={onPressPrevButton}
        onPressCurrentDate={onPressCurrentDate}
        onPressDate={() => {
          editDateContent.setIsOpenDate(true);
        }}
        onPressFilter={async () => {
          filetrContent.setIsOpenFilter(true);
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <StyledWrap>
          <StyledTabView>
            <TabView value={calendarTypeIndex} onChange={setCalendarTypeIndex}>
              <TabItem>
                <StyledContent>
                  <Calendar
                    key={Math.random().toString(36).substr(2, 9)}
                    scheduleData={schedulesForMe?.data || []}
                    currentDate={editDateContent.currentDate}
                    onPressDate={onPressDate}
                  />
                </StyledContent>
              </TabItem>
              <TabItem>
                <StyledContent>
                  <Calendar
                    key={Math.random().toString(36).substr(2, 9)}
                    scheduleData={schedulesForOthers?.data || []}
                    currentDate={editDateContent.currentDate}
                    onPressDate={onPressDate}
                  />
                </StyledContent>
              </TabItem>
            </TabView>
          </StyledTabView>
          <TrackButton
            buttonText="予定追加"
            iconName="plus"
            onPress={() => {
              scheduleRoute.navigation.navigate("edit", {
                id: null,
                oshiId: oshiId(""),
                artistId: artistId(""),
                date: dayjs(editDateContent.currentDate).format("YYYY-MM-DD"),
                calendarType: "me",
                connectedScheduleId: null,
                oshiName: "",
                endDate: "",
                startDate: "",
                title: "",
                memo: "",
              });
            }}
          />
        </StyledWrap>
      )}
    </>
  );
};
