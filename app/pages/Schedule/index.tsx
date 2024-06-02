import React, { FC, useRef } from "react";
import { FlatList, Modal } from "react-native";
import dayjs from "dayjs";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { Calendar } from "../../components/Calendar";
import { TrackButton } from "../../components/TrackButton";
import { FilterScheduleContent } from "../../components/BottomSheetContents/FilterScheduleContent";
import { EditDateContent } from "../../components/BottomSheetContents/EditDateContent";
import { oshiId } from "../../model/oshis";
import { artistId } from "../../model/artists";
import { yyyymmdd } from "../../shared/constants/date/dayJs";
import { Loading } from "../../components/Loading";
import { sleep } from "../../shared/utils";

import { ScheduleHeader } from "./components/ScheduleHeader";
import { StyledContent, StyledTabView, StyledWrap } from "./style";
import { useSchedule } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"appSchedule">;
  scheduleRoute: RoutingPropsOfSchedule<"appScheduleTop">;
};

export const Schedule: FC<Props> = ({ scheduleRoute }) => {
  const flatListRef = useRef<FlatList | null>(null);

  const {
    isLoading,
    schedules,
    displayedOshis,
    startDate,
    endDate,
    currentDate,
    isFirstRender,
    onPressDate,
    setIsFirstRender,
    updateDisplayedOshis,
    filterContent,
    editDateContent,
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
      <Modal animationType="fade" visible={filterContent.isOpenFilter} transparent={true}>
        <FilterScheduleContent
          displayedOshis={displayedOshis}
          updateDisplayedOshis={updateDisplayedOshis}
          onPressCancel={() => filterContent.setIsOpenFilter(false)}
        />
      </Modal>
      <ScheduleHeader
        onPressFilter={async () => {
          filterContent.setIsOpenFilter(true);
        }}
      />
      <StyledWrap>
        <StyledTabView>
          <StyledContent>
            {isLoading ? (
              <Loading />
            ) : (
              <FlatList
                ref={flatListRef}
                initialNumToRender={schedules.length}
                data={schedules ?? []}
                keyExtractor={(item) => `${item.year}${item.month}`}
                renderItem={({ item }) => (
                  <Calendar
                    scheduleData={item}
                    displayedOshis={displayedOshis}
                    onPressDate={onPressDate}
                  />
                )}
                onContentSizeChange={async () => {
                  if (flatListRef.current && !isFirstRender) {
                    const moveIndex = schedules.findIndex(
                      (schedule) =>
                        schedule.year === currentDate.year() &&
                        schedule.month === currentDate.month(),
                    );

                    setIsFirstRender(true);
                    await sleep(500);
                    flatListRef.current.scrollToIndex({
                      animated: false,
                      index: moveIndex,
                    });
                  }
                }}
              />
            )}
          </StyledContent>
        </StyledTabView>
        <TrackButton
          buttonText="予定追加"
          iconName="plus"
          onPress={() => {
            scheduleRoute.navigation.navigate("appScheduleEdit", {
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
