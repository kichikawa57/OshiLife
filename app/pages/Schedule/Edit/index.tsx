import React, { FC } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { Input } from "../../../components/Input";
import { Accordion } from "../../../components/Accordion";
import { Textarea } from "../../../components/Textarea";
import { Header } from "../../../components/Header/Normal";
import { Icon } from "../../../components/Icon";

import { useScheduleDetail } from "./hooks";
import { StyledWrap, StyledContent, StyledDatePickerError } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"edit">;
};

export const Edit: FC<Props> = ({ scheduleRoute }) => {
  const params = scheduleRoute.route.params;

  const { control, clearErrors } = useScheduleDetail(params);

  return (
    <>
      <Header
        title={params?.title ? `${params?.title}の編集` : "スケジュール新規作成"}
        onPressLeft={() => {
          scheduleRoute.navigation.goBack();
        }}
        right={<Icon name="check" onPress={() => scheduleRoute.navigation.goBack()} />}
      />
      <StyledWrap>
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
        <StyledContent>
          <Accordion title="日付">
            <Controller
              control={control}
              name={"date"}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <DatePicker
                    date={dayjs(value).toDate()}
                    onDateChange={(date) => {
                      onChange(dayjs(date).format("YYYY-MM-DD HH:mm:ss"));
                    }}
                    locale="ja"
                  />
                  {error && <StyledDatePickerError>{error.message}</StyledDatePickerError>}
                </>
              )}
            />
          </Accordion>
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
