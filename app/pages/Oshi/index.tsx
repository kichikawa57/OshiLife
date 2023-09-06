import React, { FC } from "react";
import { Modal } from "react-native";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfOshi } from "../../router/app/Oshi/types";
import { ListItem } from "../../components/List";
import { Button } from "../../components/Button";
import { TrackButton } from "../../components/TrackButton";
import { EditOshiContent } from "../../components/BottomSheetContents/EditOshiContent";

import { StyledList, StyledListWrap, StyledContentWrap, StyledWrap } from "./style";
import { useOshi } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"top">;
};

export const Oshi: FC<Props> = ({ oshiRoute }) => {
  const {
    control,
    clearErrors,
    isOpen,
    isSelectedEdit,
    setIsSelectedEdit,
    setIsOpenColor,
    onPressCancel,
    onPressComplete,
    setIsOpen,
  } = useOshi();

  return (
    <>
      <Modal animationType="slide" presentationStyle="pageSheet" visible={isOpen}>
        <EditOshiContent
          control={control}
          isSelectedEdit={isSelectedEdit}
          clearErrors={clearErrors}
          onPressComplete={onPressComplete}
          onPressCancel={onPressCancel}
          onPressEditColor={() => {
            setIsOpenColor(true);
            console.log("はっか");
            setIsSelectedEdit(false);
          }}
        />
      </Modal>
      <StyledWrap>
        <StyledContentWrap>
          <StyledListWrap>
            <StyledList>
              <ListItem
                title="川村 和馬"
                avatarUrl="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                bottomDivider={true}
                onPress={() => oshiRoute.navigation.navigate("detail")}
                rightContent={
                  <Button
                    title="Delete"
                    onPress={() => oshiRoute.navigation.navigate("detail")}
                    iconName="trash-o"
                    buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                  />
                }
              />
            </StyledList>
          </StyledListWrap>
        </StyledContentWrap>
        <TrackButton
          buttonText="追加"
          iconName="plus"
          onPress={() => {
            setIsOpen(true);
          }}
        />
      </StyledWrap>
    </>
  );
};
