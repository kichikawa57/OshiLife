import React, { FC, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { CheckBoxItem } from "../../components/CheckBox/Item";
import { CheckBoxGroup } from "../../components/CheckBox/Group";
import { TabList } from "../../components/Tab/List";
import { TabView } from "../../components/Tab/View";
import { TabItem } from "../../components/Tab/View/Item";
import { Calendar } from "../../components/Calendar";
import { StyledTabPanel } from "../../components/Tab/List/style";
import { EditScheduleContent } from "../../components/BottomSheetContents/EditScheduleContent";
import { TrackButton } from "../../components/TrackButton";

import { StyledCheckBox, StyledContent, StyledTabView, StyledWrap } from "./style";
import { useSchedule } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"top">;
};

export const Schedule: FC<Props> = () => {
  const [dateType, setDateType] = useState(0);
  const [calendarType, setCalendarType] = useState(0);
  const { control, clearErrors, ref, onPressCancel, onPressComplete, onChange } = useSchedule();

  return (
    <>
      <BottomSheetModal ref={ref} index={0} snapPoints={["90%"]} onChange={onChange}>
        <EditScheduleContent
          control={control}
          clearErrors={clearErrors}
          onPressComplete={onPressComplete}
          onPressCancel={onPressCancel}
        />
      </BottomSheetModal>
      <TrackButton
        buttonText="予定追加"
        iconName="plus"
        isHiddenHeader
        onPress={() => {
          ref.current?.present();
        }}
      />
      <StyledWrap>
        <TabList list={["日", "週", "月"]} value={dateType} onClick={setDateType} />
        <StyledCheckBox>
          <CheckBoxGroup>
            <CheckBoxItem
              imageUrl="testr"
              isSelected
              name="川村和馬"
              onPress={() => null}
              isMarginRight
            />
            <CheckBoxItem imageUrl="testr" isSelected name="吉野北斗" onPress={() => null} />
          </CheckBoxGroup>
        </StyledCheckBox>
        <StyledTabPanel>
          <TabList
            list={["all", "自分の"]}
            value={calendarType}
            onClick={setCalendarType}
            type="panel"
          />
        </StyledTabPanel>
        <StyledTabView>
          <TabView value={calendarType} onChange={setCalendarType}>
            <TabItem>
              <StyledContent>
                <Calendar />
              </StyledContent>
            </TabItem>
            <TabItem>
              <StyledContent>
                <Calendar />
              </StyledContent>
            </TabItem>
          </TabView>
        </StyledTabView>
      </StyledWrap>
    </>
  );
};
