import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Modal } from "react-native";
import { Image } from "@rneui/base";

import { Input } from "../../components/Input";
import { RoutingPropsOfRoot } from "../../router/types";
import { CircleList } from "../../components/CircleForColor/CircleList";
import { Button } from "../../components/Button";
import { EditColorContent } from "../../components/BottomSheetContents/EditColorContent";
import { Textarea } from "../../components/Textarea";
import { SelectArtistListContent } from "../../components/BottomSheetContents/SelectArtistListContent";
import { KeyboardWrapper } from "../../components/KeyboardWrapper";
import { Header } from "../../components/Header/Normal";

import {
  StyledButton,
  StyledButtonWrap,
  StyledForm,
  StyledImageTouch,
  StyledInput,
  StyledTitle,
  StyledWrap,
} from "./style";
import { useSetupOshi } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"setupOshi">;
};

export const SetupOshi: FC<Props> = ({ rootRoute }) => {
  const { control, clearErrors, onPress, editColor, selectedOshi, setValue, uploadImageMutation } =
    useSetupOshi(rootRoute);
  return (
    <>
      <Modal animationType="slide" visible={editColor.isModal} presentationStyle="fullScreen">
        <Controller
          control={control}
          name={"color"}
          render={({ field: { onChange, value } }) => (
            <EditColorContent
              color={value}
              onPressCancel={() => {
                editColor.setIsModal(false);
              }}
              onPressComplete={(color) => {
                onChange(color);
                editColor.setIsEditColor(true);
                editColor.setIsModal(false);
              }}
            />
          )}
        />
      </Modal>
      <Modal
        animationType="slide"
        visible={selectedOshi.isOpenSelectedOshiModal}
        presentationStyle="fullScreen"
      >
        <Controller
          control={control}
          name={"artistId"}
          render={({ field: { onChange } }) => (
            <SelectArtistListContent
              onPressCancel={() => {
                selectedOshi.setIsOpenSelectedOshiModal(false);
              }}
              onPressComplete={(id, name) => {
                onChange(id);
                setValue("name", name);
                selectedOshi.setIsOpenSelectedOshiModal(false);
              }}
            />
          )}
        />
      </Modal>
      <Header title={"推しを選択"} />
      <KeyboardWrapper isKeyboardAvoidingView isEnabledKeyboardAvoiding>
        <StyledWrap>
          <StyledForm>
            <StyledInput isMarginBottom={true}>
              <StyledTitle>画像選択</StyledTitle>
              <Controller
                control={control}
                name={"image"}
                render={({ field: { value } }) => (
                  <StyledImageTouch
                    onPress={async () => {
                      uploadImageMutation.mutate();
                    }}
                  >
                    <Image
                      source={value !== "" ? { uri: value } : require("./person.png")}
                      style={{ width: 100, height: 100 }}
                    />
                  </StyledImageTouch>
                )}
              />
            </StyledInput>
            <StyledInput isMarginBottom={true}>
              <Controller
                control={control}
                name={"name"}
                render={({ field: { value }, fieldState: { error } }) => (
                  <Input
                    title="推し選択"
                    value={value}
                    onPress={() => {
                      selectedOshi.setIsOpenSelectedOshiModal(true);
                    }}
                    errorMessage={error && error.message}
                  />
                )}
              />
            </StyledInput>
            <StyledInput isMarginBottom={true}>
              <Controller
                control={control}
                name={"color"}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CircleList
                    title="推しの色を選択してください"
                    selectColor={value}
                    onClick={(color) => {
                      editColor.setIsEditColor(false);
                      onChange(color !== value ? color : "");
                      clearErrors("color");
                    }}
                    isSelectedEdit={editColor.isEditColor}
                    onClickEdit={() => {
                      !editColor.isEditColor && onChange("");
                      editColor.setIsModal(true);
                    }}
                    errorMessage={error && error.message}
                  />
                )}
              />
            </StyledInput>
            <StyledInput isMarginBottom={true}>
              <Controller
                control={control}
                name={"memo"}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Textarea
                    title="メモ"
                    value={value}
                    onChangeText={(value) => {
                      onChange(value);
                      clearErrors("memo");
                    }}
                    errorMessage={error && error.message}
                  />
                )}
              />
            </StyledInput>
          </StyledForm>
        </StyledWrap>
      </KeyboardWrapper>
      <StyledButtonWrap>
        <StyledButton>
          <Button title="次へ" onPress={() => onPress()} />
        </StyledButton>
      </StyledButtonWrap>
    </>
  );
};
