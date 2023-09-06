import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Modal } from "react-native";

import { Input } from "../../components/Input";
import { RoutingPropsOfRoot } from "../../router/types";
import { CircleList } from "../../components/CircleForColor/CircleList";
import { Button } from "../../components/Button";
import { EditColorContent } from "../../components/BottomSheetContents/EditColorContent";

import { StyledButton, StyledButtonWrap, StyledForm, StyledInput, StyledWrap } from "./style";
import { useSetupOshi } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"setupOshi">;
};

export const SetupOshi: FC<Props> = ({ rootRoute }) => {
  const { control, clearErrors, onPress, editColor } = useSetupOshi(rootRoute);

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
      <StyledWrap>
        <StyledForm>
          <StyledInput isMarginBottom={true}>
            <Controller
              control={control}
              name={"name"}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  title="メールアドレス"
                  value={value}
                  onChangeText={(value) => {
                    onChange(value);
                    clearErrors("name");
                  }}
                  errorMessage={error && error.message}
                />
              )}
            />
          </StyledInput>
          <StyledInput isMarginBottom={false}>
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
        </StyledForm>
      </StyledWrap>
      <StyledButtonWrap>
        <StyledButton>
          <Button title="次へ" onPress={onPress} />
        </StyledButton>
      </StyledButtonWrap>
    </>
  );
};
