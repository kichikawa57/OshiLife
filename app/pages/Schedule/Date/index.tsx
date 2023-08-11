import React, { FC } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { CheckBoxGroup } from "../../../components/CheckBox/Group";
import { CheckBoxItem } from "../../../components/CheckBox/Item";
import { ListItem } from "../../../components/List";
import { TrackButton } from "../../../components/TrackButton";
import { EditScheduleContent } from "../../../components/BottomSheetContents/EditScheduleContent";

import {
  StyledCheckBox,
  StyledScrollView,
  StyledScrollViewInner,
  StyledScrollViewWrap,
  StyledWrap,
} from "./style";
import { useScheduleDate } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"date">;
};

export const Date: FC<Props> = ({ scheduleRoute }) => {
  const { control, clearErrors, ref, onPressCancel, onPressComplete, onChange } = useScheduleDate();

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
      <StyledWrap>
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
        <StyledScrollViewWrap>
          <StyledScrollView>
            <StyledScrollViewInner>
              <ListItem
                title="川村 和馬のイベントに参加します"
                onPress={() => scheduleRoute.navigation.navigate("detail")}
                avatarUrl="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                bottomDivider={true}
              />
              <ListItem
                title="吉野 和馬のイベントに参加します"
                onPress={() => scheduleRoute.navigation.navigate("detail")}
                avatarUrl="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
              />
            </StyledScrollViewInner>
          </StyledScrollView>
        </StyledScrollViewWrap>
        <TrackButton
          buttonText="予定追加"
          iconName="plus"
          onPress={() => {
            ref.current?.present();
          }}
        />
      </StyledWrap>
    </>
  );
};
