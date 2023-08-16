import React, { FC, useState } from "react";

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
import { BottomSheet } from "../../components/BottomSheet";

import { ScheduleHeader } from "./components/ScheduleHeader";
import { StyledContent, StyledTabView, StyledWrap } from "./style";
import { useSchedule } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"top">;
};

export const Schedule: FC<Props> = () => {
  const [dateType, setDateType] = useState(0);
  const [calendarType, setCalendarType] = useState(0);
  const {
    control,
    clearErrors,
    ref,
    onPressCancel,
    onPressComplete,
    onChange,
    onPressCancelForFilter,
    filterRef,
    dateRef,
    editDateContent,
  } = useSchedule();

  return (
    <>
      {/* <StyledBg /> */}
      <BottomSheet bottomSheetModalRef={dateRef} index={0}>
        <EditDateContent
          currentDate={editDateContent.currentDate}
          onPressCancel={editDateContent.onPressCancelForDate}
          onPressComplete={editDateContent.onPressCompleteForDate}
        />
      </BottomSheet>
      <BottomSheet bottomSheetModalRef={ref} index={0} snapPoints={["90%"]} onChange={onChange}>
        <EditScheduleContent
          control={control}
          clearErrors={clearErrors}
          onPressComplete={onPressComplete}
          onPressCancel={onPressCancel}
        />
      </BottomSheet>
      <BottomSheet bottomSheetModalRef={filterRef} index={0}>
        <FilterScheduleContent
          dateType={dateType}
          setDateType={setDateType}
          calendarType={calendarType}
          setCalendarType={setCalendarType}
          onPressCancel={onPressCancelForFilter}
        />
      </BottomSheet>
      <TrackButton
        buttonText="予定追加"
        iconName="plus"
        isHiddenHeader
        onPress={() => {
          ref.current?.present();
        }}
      />
      <ScheduleHeader
        currentDate={editDateContent.currentDate}
        onPress={() => {
          dateRef.current?.present();
        }}
      />
      <StyledWrap>
        <StyledTabView>
          <TabView value={calendarType} onChange={setCalendarType}>
            <TabItem>
              <StyledContent>
                <Calendar currentDate={editDateContent.currentDate} />
              </StyledContent>
            </TabItem>
            {/* <TabItem>
              <StyledContent>
                <Calendar />
              </StyledContent>
            </TabItem> */}
          </TabView>
        </StyledTabView>
      </StyledWrap>
    </>
  );
};
