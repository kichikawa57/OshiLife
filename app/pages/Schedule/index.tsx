import React, { FC, useState } from "react";
import { Modal } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { TabView } from "../../components/Tab/View";
import { TabItem } from "../../components/Tab/View/Item";
import { Calendar } from "../../components/Calendar";
import { EditScheduleContent } from "../../components/BottomSheetContents/EditScheduleContent";
import { TrackButton } from "../../components/TrackButton";
import { FilterScheduleContent } from "../../components/BottomSheetContents/FilterScheduleContent";
import { EditDateContent } from "../../components/BottomSheetContents/EditDateContent";

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
  const [calendarType, setCalendarType] = useState(0);
  const {
    control,
    clearErrors,
    onPressDate,
    createScheduleContent,
    editDateContent,
    filetrContent,
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
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={createScheduleContent.isOpenCreateSchedule}
      >
        <EditScheduleContent
          control={control}
          clearErrors={clearErrors}
          onPressComplete={createScheduleContent.onPressComplete}
          onPressCancel={createScheduleContent.onPressCancel}
        />
      </Modal>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={createScheduleContent.isOpenCreateSchedule}
      >
        <EditScheduleContent
          control={control}
          clearErrors={clearErrors}
          onPressComplete={createScheduleContent.onPressComplete}
          onPressCancel={createScheduleContent.onPressCancel}
        />
      </Modal>
      <Modal animationType="fade" visible={filetrContent.isOpenFilter} transparent={true}>
        <FilterScheduleContent
          dateType={dateType}
          setDateType={setDateType}
          calendarType={calendarType}
          setCalendarType={setCalendarType}
          onPressCancel={() => filetrContent.setIsOpenFilter(false)}
        />
      </Modal>
      <ScheduleHeader
        currentDate={editDateContent.currentDate}
        onPressDate={() => {
          editDateContent.setIsOpenDate(true);
        }}
        onPressFilter={async () => {
          filetrContent.setIsOpenFilter(true);
        }}
      />
      <StyledWrap>
        <StyledTabView>
          <TabView value={calendarType} onChange={setCalendarType}>
            <TabItem>
              <StyledContent>
                <Calendar
                  key={Math.random().toString(36).substr(2, 9)}
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
            createScheduleContent.openCreateScheduleModal();
          }}
        />
      </StyledWrap>
    </>
  );
};
