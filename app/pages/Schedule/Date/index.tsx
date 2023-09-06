import React, { FC } from "react";
import { Modal } from "react-native";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { CheckBoxGroup } from "../../../components/CheckBox/Group";
import { CheckBoxItem } from "../../../components/CheckBox/Item";
import { ListItem } from "../../../components/List";
import { TrackButton } from "../../../components/TrackButton";
import { EditScheduleContent } from "../../../components/BottomSheetContents/EditScheduleContent";
import { Button } from "../../../components/Button";

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
  const { control, isModal, clearErrors, setIsModal, onPressCancel, onPressComplete } =
    useScheduleDate();

  return (
    <>
      <Modal animationType="slide" presentationStyle="pageSheet" visible={isModal}>
        <EditScheduleContent
          control={control}
          clearErrors={clearErrors}
          onPressComplete={onPressComplete}
          onPressCancel={onPressCancel}
        />
      </Modal>
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
                rightContent={
                  <Button
                    title="Delete"
                    onPress={() => scheduleRoute.navigation.navigate("detail")}
                    iconName="trash-o"
                    buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                  />
                }
              />
              <ListItem
                title="川村 和馬のイベントに参加します"
                onPress={() => scheduleRoute.navigation.navigate("detail")}
                avatarUrl="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                bottomDivider={false}
                rightContent={
                  <Button
                    title="Delete"
                    onPress={() => scheduleRoute.navigation.navigate("detail")}
                    iconName="trash-o"
                    buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                  />
                }
              />
            </StyledScrollViewInner>
          </StyledScrollView>
        </StyledScrollViewWrap>
        <TrackButton
          buttonText="予定追加"
          iconName="plus"
          onPress={() => {
            setIsModal(true);
          }}
        />
      </StyledWrap>
    </>
  );
};
