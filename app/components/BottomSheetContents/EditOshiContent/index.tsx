import React, { FC } from "react";
import { Control, Controller, UseFormClearErrors } from "react-hook-form";

import { Input } from "../../Input";
import { CircleList } from "../../CircleForColor/CircleList";
import { Textarea } from "../../Textarea";
import { FormData } from "../../../pages/Oshi/validate";
import { ContentBase } from "../ContentBase";

import { StyledContent, StyledSelectedImage, StyledSelectedImageInner } from "./style";

type Props = {
  control: Control<FormData>;
  isSelectedEdit: boolean;
  clearErrors: UseFormClearErrors<FormData>;
  onPressCancel: () => void;
  onPressComplete: () => void;
  onPressEditColor: () => void;
};

export const EditOshiContent: FC<Props> = ({
  control,
  isSelectedEdit,
  clearErrors,
  onPressCancel,
  onPressComplete,
  onPressEditColor,
}) => {
  return (
    <ContentBase onPressCancel={onPressCancel} onPressComplete={onPressComplete}>
      <StyledSelectedImage>
        <StyledSelectedImageInner />
      </StyledSelectedImage>
      <StyledContent>
        <Controller
          control={control}
          name={"name"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              title="推しの名前"
              value={value}
              onChangeText={(value) => {
                onChange(value);
                clearErrors("name");
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
              isSelectedEdit={isSelectedEdit}
              onClick={(color) => {
                console.log(color);
                onChange(color !== value ? color : "");
                clearErrors("color");
              }}
              onClickEdit={() => {
                onPressEditColor();
              }}
              errorMessage={error && error.message}
            />
          )}
        />
      </StyledContent>
      <StyledContent>
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
    </ContentBase>
  );
};
