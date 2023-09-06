import React, { FC } from "react";
import { Modal } from "react-native";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfProfile } from "../../router/app/Profile/types";
import { TrackButton } from "../../components/TrackButton";
import { EditProfileContent } from "../../components/BottomSheetContents/EditProfileContent";

import {
  StyledWrap,
  StyledListWrap,
  StyledList,
  StyledListTitle,
  StyledListText,
  StyledListTextWrap,
} from "./style";
import { useOshi } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"profile">;
  profileRoute: RoutingPropsOfProfile<"top">;
};

export const Profile: FC<Props> = () => {
  const { control, clearErrors, isOpen, onPressCancel, onPressComplete, setIsOpen } = useOshi();

  return (
    <>
      <Modal animationType="slide" presentationStyle="pageSheet" visible={isOpen}>
        <EditProfileContent
          control={control}
          clearErrors={clearErrors}
          onPressComplete={onPressComplete}
          onPressCancel={onPressCancel}
        />
      </Modal>
      <StyledWrap>
        <StyledListWrap>
          <StyledList>
            <StyledListTitle>メールアドレス</StyledListTitle>
            <StyledListTextWrap>
              <StyledListText>k.ichikawa057@gmail.com</StyledListText>
            </StyledListTextWrap>
          </StyledList>
        </StyledListWrap>
      </StyledWrap>
      <TrackButton
        buttonText="編集"
        iconName="pencil"
        onPress={() => {
          setIsOpen(true);
        }}
      />
    </>
  );
};
