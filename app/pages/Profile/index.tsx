import React, { FC } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

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
  const { control, clearErrors, ref, onPressCancel, onPressComplete, onChange } = useOshi();

  return (
    <>
      <BottomSheetModal ref={ref} index={0} snapPoints={["90%"]} onChange={onChange}>
        <EditProfileContent
          control={control}
          clearErrors={clearErrors}
          onPressComplete={onPressComplete}
          onPressCancel={onPressCancel}
        />
      </BottomSheetModal>
      <TrackButton
        buttonText="編集"
        iconName="pencil"
        onPress={() => {
          ref.current?.present();
        }}
      />
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
    </>
  );
};
