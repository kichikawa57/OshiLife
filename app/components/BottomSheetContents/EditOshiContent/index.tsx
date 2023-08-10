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
  clearErrors: UseFormClearErrors<FormData>;
  onPressCancel: () => void;
  onPressComplete: () => void;
};

export const EditOshiContent: FC<Props> = ({
  control,
  clearErrors,
  onPressCancel,
  onPressComplete,
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
              onClick={(color) => {
                console.log(color);
                onChange(color !== value ? color : "");
                clearErrors("color");
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
