import React, { FC } from "react";
import { Control, Controller, UseFormClearErrors } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";

import { Input } from "../../Input";
import { Textarea } from "../../Textarea";
import { FormData } from "../../../pages/Schedule/validate";
import { ContentBase } from "../ContentBase";

import {
  StyledContent,
  StyledDatePicker,
  StyledDatePickerError,
  StyledDatePickerTitle,
  StyledDatePickerWrap,
} from "./style";

type Props = {
  control: Control<FormData>;
  isDisplayDate?: boolean;
  clearErrors: UseFormClearErrors<FormData>;
  onPressCancel: () => void;
  onPressComplete: () => void;
};

export const EditScheduleContent: FC<Props> = ({
  control,
  isDisplayDate = true,
  clearErrors,
  onPressCancel,
  onPressComplete,
}) => {
  return (
    <ContentBase onPressCancel={onPressCancel} onPressComplete={onPressComplete}>
      <StyledContent>
        <Controller
          control={control}
          name={"title"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              title="タイトル"
              value={value}
              onChangeText={(value) => {
                onChange(value);
                clearErrors("title");
              }}
              errorMessage={error && error.message}
            />
          )}
        />
      </StyledContent>
      <StyledContent>
        <Controller
          control={control}
          name={"oshiName"}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              title="推し選択"
              value={value}
              onChangeText={(value) => {
                onChange(value);
                clearErrors("oshiName");
              }}
              errorMessage={error && error.message}
            />
          )}
        />
      </StyledContent>
      {isDisplayDate && (
        <StyledContent>
          <StyledDatePickerWrap>
            <StyledDatePickerTitle>日付</StyledDatePickerTitle>
            <Controller
              control={control}
              name={"date"}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <StyledDatePicker>
                    <DatePicker
                      date={dayjs(value).toDate()}
                      onDateChange={(date) => {
                        onChange(dayjs(date).format("YYYY-MM-DD HH:mm:ss"));
                      }}
                      locale="ja"
                    />
                  </StyledDatePicker>
                  {error && <StyledDatePickerError>{error.message}</StyledDatePickerError>}
                </>
              )}
            />
          </StyledDatePickerWrap>
        </StyledContent>
      )}
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
