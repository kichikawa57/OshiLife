import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Modal } from "react-native";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { Input } from "../../../components/Input";
import { Textarea } from "../../../components/Textarea";
import { Header } from "../../../components/Header/Normal";
import { Icon } from "../../../components/Icon";
import { RoutingPropsOfOshi } from "../../../router/app/Oshi/types";
import { CircleList } from "../../../components/CircleForColor/CircleList";
import { EditColorContent } from "../../../components/BottomSheetContents/EditColorContent";
import { SelectOshiListContent } from "../../../components/BottomSheetContents/SelectOshiListContent";
import { OSHI_LIST } from "../../../shared/constants/oshi";

import { useOshiEdit } from "./hooks";
import { StyledWrap, StyledContent } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"edit">;
};

export const Edit: FC<Props> = ({ oshiRoute }) => {
  const params = oshiRoute.route.params;

  const {
    control,
    clearErrors,
    setIsEditColor,
    setIsOpenSelectedColorModal,
    setIsOpenSelectedOshiModal,
    isOpenSelectedColorModal,
    isOpenSelectedOshiModal,
    isEditColor,
  } = useOshiEdit(params);

  return (
    <>
      <Modal
        animationType="slide"
        visible={isOpenSelectedColorModal}
        presentationStyle="fullScreen"
      >
        <Controller
          control={control}
          name={"color"}
          render={({ field: { onChange, value } }) => (
            <EditColorContent
              color={value}
              onPressCancel={() => {
                setIsOpenSelectedColorModal(false);
              }}
              onPressComplete={(color) => {
                onChange(color);
                setIsEditColor(true);
                setIsOpenSelectedColorModal(false);
              }}
            />
          )}
        />
      </Modal>
      <Modal animationType="slide" visible={isOpenSelectedOshiModal} presentationStyle="fullScreen">
        <Controller
          control={control}
          name={"name"}
          render={({ field: { onChange } }) => (
            <SelectOshiListContent
              oshiList={OSHI_LIST}
              onPressCancel={() => {
                setIsOpenSelectedOshiModal(false);
              }}
              onPressComplete={(_, name) => {
                onChange(name);
                setIsOpenSelectedOshiModal(false);
              }}
            />
          )}
        />
      </Modal>
      <Header
        title={params?.name ? `${params.name}の編集` : "推し新規作成"}
        onPressLeft={() => {
          oshiRoute.navigation.goBack();
        }}
        right={<Icon name="check" onPress={() => oshiRoute.navigation.goBack()} />}
      />
      <StyledWrap>
        <StyledContent>
          <Controller
            control={control}
            name={"name"}
            render={({ field: { value }, fieldState: { error } }) => (
              <Input
                title="推しの名前"
                value={value}
                onPress={() => {
                  setIsOpenSelectedOshiModal(true);
                }}
                errorMessage={error && error.message}
              />
            )}
          />
        </StyledContent>
        <StyledContent>
          <Controller
            control={control}
            name={"color"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CircleList
                title="推しの色を選択してください"
                selectColor={value}
                isSelectedEdit={isEditColor}
                onClick={(color) => {
                  setIsEditColor(false);
                  onChange(color !== value ? color : "");
                  clearErrors("color");
                }}
                onClickEdit={() => {
                  setIsOpenSelectedColorModal(true);
                }}
                errorMessage={error && error.message}
              />
            )}
          />
        </StyledContent>
        <StyledContent isHideMarginBottom>
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
        </StyledContent>
      </StyledWrap>
    </>
  );
};
