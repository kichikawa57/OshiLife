import React, { FC, useState } from "react";
import { Modal, View } from "react-native";
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
import { TabList } from "../../components/Tab/List";
import { yyyymmdd } from "../../shared/constants/date/dayJs";

import { ScheduleHeader } from "./components/ScheduleHeader";
import { StyledContent, StyledTabList, StyledTabView, StyledWrap } from "./style";
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
    isLoadingSchedulesForMe,
    isLoadingSchedulesForOthers,
    editDateContent,
    filetrContent,
    schedulesForMeData,
    schedulesForOthersData,
    calendarTypeIndex,
    displayedOshis,
    startDate,
    endDate,
    swipeCalendar,
    updateDisplayedOshis,
    switchCalendarType,
    onPressNextButton,
    onPressPrevButton,
    onPressCurrentDate,
    onPressRefresh,
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
          displayedOshis={displayedOshis}
          updateDisplayedOshis={updateDisplayedOshis}
          setDateType={setDateType}
          calendarType={calendarTypeIndex}
          setCalendarType={switchCalendarType}
          onPressCancel={() => filetrContent.setIsOpenFilter(false)}
        />
      </Modal>
      <ScheduleHeader
        currentDate={editDateContent.currentDate}
        onPressNextButton={onPressNextButton}
        onPressPrevButton={onPressPrevButton}
        onPressCurrentDate={onPressCurrentDate}
        onPressRefresh={onPressRefresh}
        onPressDate={() => {
          editDateContent.setIsOpenDate(true);
        }}
        onPressFilter={async () => {
          filetrContent.setIsOpenFilter(true);
        }}
      />
      <StyledWrap>
        <StyledTabList>
          <TabList
            list={["自分の", "それ以外"]}
            value={calendarTypeIndex}
            onClick={switchCalendarType}
            type="panel"
          />
        </StyledTabList>
        <StyledTabView>
          <View {...swipeCalendar.panHandlers} style={{ flex: 1 }}>
            <TabView value={calendarTypeIndex} onChange={switchCalendarType}>
              <TabItem>
                <StyledContent>
                  {isLoadingSchedulesForMe ? (
                    <Loading />
                  ) : (
                    <Calendar
                      key={Math.random().toString(36).substr(2, 9)}
                      scheduleData={schedulesForMeData}
                      currentDate={editDateContent.currentDate}
                      onPressDate={onPressDate}
                    />
                  )}
                </StyledContent>
              </TabItem>
              <TabItem>
                <StyledContent>
                  {isLoadingSchedulesForOthers ? (
                    <Loading />
                  ) : (
                    <Calendar
                      key={Math.random().toString(36).substr(2, 9)}
                      scheduleData={schedulesForOthersData}
                      currentDate={editDateContent.currentDate}
                      onPressDate={onPressDate}
                    />
                  )}
                </StyledContent>
              </TabItem>
            </TabView>
          </View>
        </StyledTabView>
        <TrackButton
          buttonText="予定追加"
          iconName="plus"
          onPress={() => {
            scheduleRoute.navigation.navigate("edit", {
              id: null,
              oshiId: oshiId(""),
              artistId: artistId(""),
              date: dayjs(editDateContent.currentDate).format(yyyymmdd),
              calendarType: "me",
              connectedScheduleId: null,
              oshiName: "",
              endDate,
              startDate,
              title: "",
              memo: "",
              isPublic: true,
            });
          }}
        />
      </StyledWrap>
    </>
  );
};
